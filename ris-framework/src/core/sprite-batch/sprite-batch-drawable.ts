import type {IFramework, ITexture2D} from "ris-framework-api";
import type {IUniformBuffer} from "../buffers/uniform-buffer-interface.ts";
import type {SpriteBatchMesh} from "./sprite-batch-mesh.ts";
import type {ISpriteRenderPipeline} from "../render-pipelines/sprite-render-pipeline.ts";


export class SpriteBatchDrawable {

    private readonly _framework : IFramework;
    private readonly _texture: ITexture2D;
    private _maxBatchSize: number;
    private _projectionViewBuffer: IUniformBuffer;
   private _drawingMesh: SpriteBatchMesh = null!;
   private _renderPipeline: ISpriteRenderPipeline = null!;

   private bool needsResize;

   private int fromInstance;
   private int toInstance;

    /**
     * The constructor.
     * @param framework
     * @param texture
     * @param projectionViewBuffer
     * @param maxBatchSize
     */
   public constructor(
        framework: IFramework,
        texture: ITexture2D ,
         projectionViewBuffer: IUniformBuffer,
         maxBatchSize: number)
{
    this._framework = framework;
    this.texture = texture;
    this.maxBatchSize = maxBatchSize;
    this.projectionViewBuffer = projectionViewBuffer;
}

    /**
     * The projection view buffer.
     */
    public readonly projectionViewBuffer: IUniformBuffer;

   public initialize(): void
{
    this._renderPipeline = this._framework.pipelineFactory.createSpriteRenderPipeline(projectionViewBuffer);
    this._renderPipeline.SpriteTexture = texture;

    drawingMesh = new (framework, (uint)maxBatchSize);
    drawingMesh.Initialize();
}

   /// <summary>
   /// Resets the batch.
   /// </summary>
   public void Reset()
{
    // Nothing is drawn yet.
    fromInstance = 0;
    toInstance = 0;
}

   /// <summary>
   /// Write a sprite to the batch sprite mesh.
   /// </summary>
   /// <param name="position">The position of a sprite.</param>
   /// <param name="size">The size of a sprite.</param>
   /// <param name="u0">The u0 texture coordinate. By default, <c>0</c>.</param>
   /// <param name="v0">The v0 texture coordinate. By default, <c>0</c>.</param>
   /// <param name="u1">The u1 texture coordinate. By default, <c>1</c>.</param>
   /// <param name="v1">The v1 texture coordinate. By default, <c>1</c>.</param>

   public void WriteSprite(
    Vector3D < float > position,
    Vector2D < float > size,
    float u0 = 0,
    float v0 = 0,
    float u1 = 1,
    float v1 = 1)
       => WriteSprite(position, size, Color.White, u0, v0, u1, v1);

   /// <summary>
   /// Write a sprite to the batch sprite mesh.
   /// </summary>
   /// <param name="position">The position of a sprite.</param>
   /// <param name="size">The size of a sprite.</param>
   /// <param name="color">The color of a sprite.</param>
   /// <param name="u0">The u0 texture coordinate. By default, <c>0</c>.</param>
   /// <param name="v0">The v0 texture coordinate. By default, <c>0</c>.</param>
   /// <param name="u1">The u1 texture coordinate. By default, <c>1</c>.</param>
   /// <param name="v1">The v1 texture coordinate. By default, <c>1</c>.</param>

   public void WriteSprite(
        Vector3D < float > position,
        Vector2D < float > size,
        Color color,
        float u0 = 0,
        float v0 = 0,
        float u1 = 1,
        float v1 = 1)
{
    // We must wait for frame end to resize.
    if (toInstance >= maxBatchSize) {
        needsResize = true;
        return;
    }

    drawingMesh.WriteSprite(toInstance, position, size, color, u0, v0, u1, v1);

    // Write at correct position.
    toInstance++;
}

   /// <summary>
   /// Write a sprite to the batch sprite mesh.
   /// </summary>
   /// <param name="position">The position of a sprite.</param>
   /// <param name="size">The size of a sprite.</param>
   /// <param name="color">The color of a sprite.</param>
   /// <param name="rotation">The rotation in counter-clockwise direction.</param>
   /// <param name="rotationOrigin">The rotation origin.</param>
   /// <param name="u0">The u0 texture coordinate. By default, <c>0</c>.</param>
   /// <param name="v0">The v0 texture coordinate. By default, <c>0</c>.</param>
   /// <param name="u1">The u1 texture coordinate. By default, <c>1</c>.</param>
   /// <param name="v1">The v1 texture coordinate. By default, <c>1</c>.</param>

   public void WriteSprite(
    Vector3D < float > position,
    Vector2D < float > size,
    Color color,
    float rotation,
    Vector2D < float > rotationOrigin,
    float u0 = 0,
    float v0 = 0,
    float u1 = 1,
    float v1 = 1)
{
    // We must wait for frame end to resize.
    if (toInstance >= maxBatchSize) {
        needsResize = true;
        return;
    }

    drawingMesh.WriteSprite(toInstance, position, size, color, rotation, rotationOrigin, u0, v0, u1, v1);

    // Write at correct position.
    toInstance++;
}

   /// <summary>
   /// Write a sprite to the batch sprite mesh.
   /// </summary>
   /// <param name="position">The position of a sprite.</param>
   /// <param name="size">The size of a sprite.</param>
   /// <param name="texCoords0">The texture coordinates for first vertex.</param>
   /// <param name="texCoords1">The texture coordinates for second vertex.</param>
   /// <param name="texCoords2">The texture coordinates for third vertex.</param>
   /// <param name="texCoords3">The texture coordinates for fourth vertex.</param>
   /// <param name="color">The color of a sprite.</param>
   public void WriteSprite(
    Vector3D < float > position,
    Vector2D < float > size,
    Vector2D < float > texCoords0,
    Vector2D < float > texCoords1,
    Vector2D < float > texCoords2,
    Vector2D < float > texCoords3,
    Color color)
{
    // We must wait for frame end to resize.
    if (toInstance >= maxBatchSize) {
        needsResize = true;
        return;
    }

    drawingMesh.WriteSprite(
        toInstance,
        position,
        size,
        texCoords0, texCoords1, texCoords2, texCoords3,
        color);

    // Write at correct position.
    toInstance += 1;
}

   /// <summary>
   /// Draws the batch.
   /// </summary>
   public void Draw()
{
    // Nothing to draw.
    if (toInstance <= 0 || fromInstance > toInstance) {
        return;
    }

    // Clamp instance to max batch size.
    if (toInstance >= maxBatchSize) {
        toInstance = maxBatchSize - 1;
    }

       // Draw mesh.
       int indicesOffset = fromInstance * 6;
       int indicesCount = toInstance * 6 - indicesOffset;
    drawingMesh.ApplyChanges();
    renderPipeline.Render(drawingMesh.VertexBuffer!, drawingMesh.IndexBuffer!,
        indicesCount,
        (uint) indicesOffset);
    fromInstance = toInstance;
}

   /// <summary>
   /// When frame has ended.
   /// </summary>
   public void FrameEnd()
{
    if (needsResize) {
        maxBatchSize *= 2;
        drawingMesh.Resize((uint) maxBatchSize);
    }

    needsResize = false;
}

}
