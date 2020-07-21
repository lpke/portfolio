function Allcenter(props) {

  return (
    <>
      <div className="center-wrapper">

        {props.children}

      </div>

      <style jsx>{`
        .center-wrapper {
          min-height: 100vh;
          overflow-y: hidden;
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default Allcenter;