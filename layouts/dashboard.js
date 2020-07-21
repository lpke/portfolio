function Dashboard(props) {

  return (
    <>
      <div className="dash-wrapper">

        {props.children}

      </div>

      <style jsx>{`
        .dash-wrapper {
          min-height: 100vh;
          overflow-y: hidden;
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default Dashboard;