function BasicFooter(props) {

  return (
    <footer>
      <a href="https://lpdev.io" target="_blank">
        &copy; LPDev {new Date().getFullYear()}
      </a>
    </footer>
  );
}

export default BasicFooter;