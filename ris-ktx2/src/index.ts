// src/index.ts
import wasmUrl from '../libktx_read.wasm?url';

export * from './ktx2-loader.ts';
export * from './ktx2-texture.ts';

export async function createKtxReadModuleAsync(options: any = {}) {
    // 1. Load WASM binary
    const wasmResponse = await fetch(wasmUrl);
    const wasmBinary = await wasmResponse.arrayBuffer();

    // 2. Load the JS glue code
    const {default: glueCode} = await import('../libktx_read.js?raw');

    // 3. Create blob URL and inject script
    const blob = new Blob([glueCode], {type: 'text/javascript'});
    const scriptUrl = URL.createObjectURL(blob);

    // 4. Load the script
    await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load libktx_read.js'));
        document.head.appendChild(script);
    });

    // 5. Delete blob URL
    URL.revokeObjectURL(scriptUrl);

    const LIBKTX = (window as any).LIBKTX;

    // 3. Initialize
    return LIBKTX({
        wasmBinary,
        ...options,
    });
}

