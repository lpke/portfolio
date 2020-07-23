function Allcenter(props) {

  return (
    <>
      <div className="center-wrapper">

        {props.children}

      </div>

      <style jsx>{`
        .center-wrapper {
          background: ${props.bgColor};
          min-height: 100vh;
          overflow-y: hidden;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-items: center;
          justify-content: center;
          padding: ${props.padding};
        }
      `}</style>
    </>
  );
}

export default Allcenter;