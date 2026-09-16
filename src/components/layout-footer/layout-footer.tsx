/*
 *  layout-footer.tsx
 * This Component is used to manage menu functionality in a single header and we'll use it all over the project.
 */
import styles from "./layout-footer.module.css";
export default function LayoutFooter() {
  // const TermsAndConditions = async () => {
  //   try {
  //     let response = await fetch(
  //       `/assets/html-template/termsandconditions.html`
  //     );

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch the HTML. Status: ${response.status}`);
  //     }
  //     let html = await response.text();
  //     const newTab = window.open();

  //     if (newTab) {
  //       newTab.document.write(html);
  //     } else {
  //       throw new Error("Failed to open a new tab");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
  // const TermsAndConditions = async () => {
  //   try {
  //     const newTab = window.open('/termsAndConditions', '_blank');

  //     if (newTab) {
  //       // Optionally, you can focus on the new tab
  //       newTab.focus();
  //     } else {
  //       throw new Error('Failed to open a new tab. Please check your browser settings.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  // const PrivacyPolicy = async () => {
  //   try {
  //     const newTab = window.open('/privacyPolicy', '_blank');

  //     if (newTab) {
  //       // Optionally, you can focus on the new tab
  //       newTab.focus();
  //     } else {
  //       throw new Error('Failed to open a new tab. Please check your browser settings.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // const PrivacyPolicy = async () => {
  //   try {
  //     let response = await fetch(`/assets/html-template/privacypolicy.html`);

  //     if (!response.ok) {
  //       throw new Error(`Failed to fetch the HTML. Status: ${response.status}`);
  //     }
  //     let html = await response.text();
  //     const newTab = window.open();

  //     if (newTab) {
  //       newTab.document.write(html);
  //     } else {
  //       throw new Error("Failed to open a new tab");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };
  return (
    <div className={styles.footer}>
      <div>© {getCurrentYear()} WEBaniX Solutions</div>
      <div className={styles.footerCondition}>
        <div>
          <span>Terms and conditions</span>
          <span> | </span>
          <span>Privacy policy</span>
        </div>
      </div>
    </div>
  );
}
