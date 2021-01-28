import { useViewport } from "lib/hooks/use-viewport";

export default function BlankCenter({ children }) {
  const { vHeight } = useViewport();
  
  return (
    <>
      <div className="page-container">
        <div className="content">
          {children}
        </div>
      </div>
      
      <style jsx>{`
        @import "styles/mixins.scss";

        .page-container {
          @include flex(column, flex-start, center, stretch);
          width: 100vw;
          height: ${vHeight > 0 ? `${vHeight}px` : "100vh"};

          .content {
            @include flex(column);
            flex: 1;
          }
        }
      `}</style>
    </>
  );
}