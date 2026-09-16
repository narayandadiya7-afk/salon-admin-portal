import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Select } from "antd";
import { eResultCode } from "../../utils/enum";
import useFetch from "../../../src/hooks/useFetch";
import styles from "./customDropdown.module.css";

type TOptions = {
  value: any;
  label: string;
  isSelected?: boolean;
};

type TProps = {
  onChange: (option: TOptions | any) => void;
  endPoint: string;
  label?: string;
  placeHolder: string;
  variant?: string;
  addPaylod?: object;
  labelStyle?: object;
  value?: any;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  optionId?: string;
  optionName?: string;
  fullPageForm?: boolean;
  fullPageFormArray?: boolean;
  new?: boolean;
  modal?: boolean;
  fullPageNew?: boolean;
  phoneView?: boolean;
  selectedName?: string;
  isMultiSelect?: boolean;
  className?: string;
  allowClear?: boolean;
  onOptionsFetched?: (options: TOptions[]) => void;
  filterOptions?: (options: TOptions[]) => TOptions[];
  maxTagCount?: number | "responsive";
};

// Cache implementation only for static dropdowns
const dropdownCache = new Map<string, any[]>();
const inFlightRequests = new Set<string>();

// Stable stringify for cache keys
function stableStringify(obj: any): string {
  if (obj === null || typeof obj !== "object") return String(obj);
  if (Array.isArray(obj)) return "[" + obj.map(stableStringify).join(",") + "]";
  return (
    "{" +
    Object.keys(obj)
      .sort()
      .map((k) => JSON.stringify(k) + ":" + stableStringify(obj[k]))
      .join(",") +
    "}"
  );
}

// Get cache key - only for static dropdowns
function getCacheKey(
  endpoint: string,
  payload: object,
  isStatic: boolean
): string {
  if (isStatic) {
    const { pageSize, currentPage, searchText, ...rest } = payload as any;
    return endpoint + ":" + stableStringify(rest);
  }
  // For dynamic dropdowns, don't use cache
  return "";
}

// Debounce function outside component
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  (debounced as any).cancel = () => {
    if (timeout) clearTimeout(timeout);
  };

  return debounced as T & { cancel: () => void };
}

const CustomDropdown = (props: TProps) => {
  const {
    onChange,
    endPoint,
    addPaylod,
    optionId = "id",
    optionName = "name",
    isMultiSelect = false,
    isDisabled = false,
    allowClear = true,
    onOptionsFetched,
    value,
    selectedName,
    maxTagCount,
  } = props;

  // State variables
  const [dropdownOptions, setDropdownOptions] = useState<TOptions[]>([]);
  const [allOptions, setAllOptions] = useState<TOptions[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(-1);
  const [totalRows, setTotalRows] = useState(0);
  const [currentSearchText, setCurrentSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const { post } = useFetch();

  // Determine if dropdown is static or dynamic
  const { effectivePageSize, isStatic } = useMemo(() => {
    const propPageSize = (addPaylod as any)?.pageSize;
    const pageSize =
      propPageSize !== undefined && propPageSize > 0 ? propPageSize : -1;
    return {
      effectivePageSize: pageSize,
      isStatic: pageSize <= 0,
    };
  }, [addPaylod]);

  // Cache key - only for static dropdowns
  const cacheKey = useMemo(() => {
    if (isStatic) {
      return getCacheKey(
        endPoint,
        {
          ...(addPaylod || {}),
          searchText: "", // Static dropdowns ignore search text in cache key
          pageSize: -1,
          currentPage: 1,
        },
        true
      );
    }
    return ""; // No cache for dynamic dropdowns
  }, [endPoint, addPaylod, isStatic]);

  // Fetch data function
  const fetchData = useCallback(async () => {
    // For static dropdowns, check cache first
    if (isStatic && cacheKey && dropdownCache.has(cacheKey)) {
      const cachedOptions = dropdownCache.get(cacheKey) || [];
      setDropdownOptions(cachedOptions);
      setAllOptions(cachedOptions);
      setIsFetched(true);
      return;
    }

    // Skip if already fetching
    const requestKey = `${endPoint}:${stableStringify({
      ...(addPaylod || {}),
      searchText: currentSearchText,
      pageSize: effectivePageSize,
      currentPage,
    })}`;

    if (inFlightRequests.has(requestKey)) return;
    inFlightRequests.add(requestKey);
    setIsLoading(true);

    if (endPoint === "") return;

    try {
      const payload = {
        data: {
          pageSize: effectivePageSize,
          currentPage,
          searchText: currentSearchText,
          ...(addPaylod && { ...addPaylod }),
        },
      };

      const response = await post(endPoint, payload);

      if (response.dataResponse.returnCode === eResultCode.SUCCESS) {
        const newOptions = response.data.map((item: any) => {
          // Check if this is employee data with uniqueId
          const label = item.employeeUniqueId
            ? `${item[optionName]}(${item.employeeUniqueId})`
            : item[optionName];

          return {
            value: item[optionId],
            label: label,
            ...item,
          };
        });

        // For paginated results, append new options
        if (currentPage > 1) {
          setDropdownOptions((prev) => [...prev, ...newOptions]);
        } else {
          setDropdownOptions(newOptions);
          onOptionsFetched?.(newOptions);
        }

        // Cache only static dropdown results
        if (isStatic && cacheKey) {
          dropdownCache.set(cacheKey, newOptions);
          setAllOptions(newOptions);
        }

        setTotalRows(response.filterModel?.totalRows ?? 0);
        setIsFetched(true);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      inFlightRequests.delete(requestKey);
      setIsLoading(false);
    }
  }, [
    isStatic,
    cacheKey,
    endPoint,
    addPaylod,
    currentSearchText,
    effectivePageSize,
    currentPage,
    post,
    optionId,
    optionName,
  ]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounced search handler
  const handleSearchDebounced = useMemo(
    () =>
      debounce((input: string) => {
        setCurrentSearchText(input);
        setCurrentPage(1); // Reset to first page when searching
      }, 300),
    []
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      handleSearchDebounced.cancel();
    };
  }, [handleSearchDebounced]);

  // Search handler
  const handleSearch = useCallback(
    (input: string) => {
      if (isStatic) {
        // Client-side filtering for static dropdowns
        const filtered = allOptions.filter((opt) =>
          opt.label.toLowerCase().includes(input.toLowerCase())
        );

        if (isMultiSelect && value) {
          const selectedValues = Array.isArray(value) ? value : [value];
          const selectedOptions = allOptions.filter((opt) =>
            selectedValues.some((val) => String(opt.value) === String(val))
          );

          // Merge selected options with filtered results
          const mergedOptions = [...selectedOptions];
          filtered.forEach((opt) => {
            if (
              !mergedOptions.some(
                (selected) => String(selected.value) === String(opt.value)
              )
            ) {
              mergedOptions.push(opt);
            }
          });
          setDropdownOptions(mergedOptions);
        } else {
          setDropdownOptions(filtered);
        }
      } else {
        // For dynamic dropdowns, use debounced API search
        handleSearchDebounced(input);
      }
    },
    [allOptions, isMultiSelect, isStatic, value, handleSearchDebounced]
  );

  // Add selected option if not in list
  useEffect(() => {
    if (value && selectedName && !isMultiSelect) {
      const optionExists = dropdownOptions.some(
        (opt) => String(opt.value) === String(value)
      );

      if (!optionExists) {
        setDropdownOptions((prev) => [...prev, { value, label: selectedName }]);
      }
    }
  }, [value, selectedName, isMultiSelect, dropdownOptions]);

  // Scroll handler for infinite loading
  const handlePopupScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
        // Only trigger for dynamic dropdowns with more results available
        if (!isStatic && totalRows > currentPage * effectivePageSize) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    },
    [isStatic, totalRows, currentPage, effectivePageSize]
  );

  // Memoized select value
  const selectValue = useMemo(() => {
    if (isMultiSelect) {
      return (value as any[])?.map((val) => {
        const option = dropdownOptions.find(
          (opt) => String(opt.value) === String(val)
        );
        return option || { value: val, label: val };
      });
    }
    return dropdownOptions.find((opt) => String(opt.value) === String(value));
  }, [isMultiSelect, value, dropdownOptions]);

  return (
    <div className={styles.mainDivStyle}>
      {props.label && (
        <span className={styles.lables}>
          {props.isRequired && <span className={styles.labelColor}>* </span>}
          <label
            style={{
              marginLeft: "4px",
              color: "#1f1f1f",
              ...props.labelStyle,
            }}
          >
            {props.label}
          </label>
        </span>
      )}

      <Select
        variant={(props?.variant as "outlined") || "outlined"}
        filterOption={false}
        showSearch={true}
        placeholder={props.placeHolder || "Select..."}
        options={
          props.filterOptions
            ? props.filterOptions(dropdownOptions)
            : dropdownOptions
        }
        onSearch={handleSearch} // Now handles both static and dynamic
        onPopupScroll={handlePopupScroll} // Handles infinite scroll
        loading={isLoading}
        disabled={isDisabled}
        allowClear={allowClear}
        onClear={() => {
          // Reset search text and refetch options with empty search when cleared
          if (!isStatic) {
            // For dynamic dropdowns, reset search text and refetch
            setCurrentSearchText("");
            setCurrentPage(1);
          } else {
            // For static dropdowns, reset to show all options
            setDropdownOptions(allOptions);
          }
        }}
        value={selectValue}
        mode={isMultiSelect ? "multiple" : undefined}
        onChange={(selected) => {
          if (isMultiSelect) {
            const selectedOptions = dropdownOptions.filter((opt) =>
              (selected as any[]).some(
                (val) => String(val) === String(opt.value)
              )
            );
            onChange(selectedOptions);
          } else {
            const selectedOption = dropdownOptions.find(
              (opt) => opt.value === selected
            );
            onChange(selectedOption || null);
          }

          // Reset search text and refetch options with empty search
          if (!isStatic) {
            // For dynamic dropdowns, reset search text and refetch
            setCurrentSearchText("");
            setCurrentPage(1);
          } else {
            // For static dropdowns, reset to show all options
            setDropdownOptions(allOptions);
          }
        }}
        maxTagCount={maxTagCount ? maxTagCount : "responsive"}
        style={{ width: "100%" }}
        className={props.className}
      />

      {props.error && <span className={styles.errorLabel}>{props.error}</span>}
    </div>
  );
};

export default CustomDropdown;
