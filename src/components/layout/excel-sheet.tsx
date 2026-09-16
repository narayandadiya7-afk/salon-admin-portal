/**
 * ExcelSheet.tsx
 * This component is the layout of all authentication pages.
 */

import React from 'react'
import styles from './layout.module.css';
// import ExcelHeader from '../layout-header/excel-header';

export default function ExcelLayout(page: React.ReactNode) {
  return (
    <div className={styles.ExcelLayout}>
      {/* <ExcelHeader /> */}
      {page}
    </div>
  )
}
