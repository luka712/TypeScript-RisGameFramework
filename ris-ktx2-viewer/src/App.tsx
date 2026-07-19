import {createTheme, Grid, ThemeProvider} from "@mui/material";
import './App.css'
import GPUSupportedTCFormatsView from "./views/GPUSupportedTCFormatsView.tsx";
import {useEffect, useRef, useState} from "react";
import KTX2FIleInfoView from "./views/KTX2FIleInfoView.tsx";
import type {IFramework} from "ris-game-framework/src/interfaces/IFramework.ts";
import {Framework} from "ris-game-framework/src/gameframework/framework.ts";

function App() {

    const theme = createTheme({ cssVariables: true, palette: { mode: 'dark' }});

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [framework] = useState<IFramework>(() => {
        const framework = new Framework();
        framework.initialize();
        return framework;
    });


    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl2");

        if (!gl) {
            console.error("WebGL2 not supported");
            return;
        }

        gl.clearColor(0.1, 0.1, 0.1, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

    }, []);

  return (
      <ThemeProvider theme={theme}>
      <div className="app">
          <Grid container spacing={2}>
              <Grid size={3}>
                  <GPUSupportedTCFormatsView framework={framework} />
                  <KTX2FIleInfoView />
              </Grid>
              <Grid size={6}>
                  <canvas
                      ref={canvasRef}
                      width={800}
                      height={600}
                  />
              </Grid>
              <Grid size={3}>

              </Grid>
          </Grid>
      </div>
      </ThemeProvider>
  )
}

export default App