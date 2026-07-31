import {type mat4, vec2, vec3} from "gl-matrix";
import {SpriteBatchDrawable} from "./SpriteBatchDrawable";
import {
    type IFramework,
    type ITexture2D,
    type ISpriteBatch,
    type IOrthographicCamera,
    type IUniformBuffer,
    Color, Rect
} from "ris-framework-api";

/**
 * The implementation of sprite batch.
 */
export class SpriteBatch implements ISpriteBatch {
    static MAX_BATCH_SIZE = 1000;
    static ZERO_VECTOR = vec2.fromValues(0, 0);
    static CENTER_VECTOR = vec2.fromValues(0.5, 0.5);

    private readonly _tempPosition = vec3.create();
    private readonly _tempSize = vec2.create();

    private readonly _spriteBatchDrawables: Map<ITexture2D, SpriteBatchDrawable> = new Map();
    private _currentTexture: ITexture2D | null = null;
    private _currentSpriteBatchDrawable: SpriteBatchDrawable = null!;
    private _defaultCamera: IOrthographicCamera = null!;

    // It is set on Begin and reset back to the default camera on End.
    private _currentProjectionViewBuffer: IUniformBuffer = null!;

    /**
     * The default texture to use for "texture less" draw calls.
     * It is white so that color multiplication works correctly.
     */
    private _defaultWhiteTexture: ITexture2D = null!;

    /**
     * The constructor.
     * @param _framework The framework.
     */
    public constructor(private readonly _framework: IFramework) {
    }

    private _checkIfNewDrawableShouldBeCreated(texture: ITexture2D): void {
        // If there was a texture change, we need to end the current sprite batch drawable and start a new one.
        if (texture != this._currentTexture) {
            // End will draw. This draws with a previously set sprite batch drawable.
            this.end();

            this._currentTexture = texture;

            // Create a new sprite batch drawable if needed.
            let spriteBatchDrawable = this._spriteBatchDrawables.get(texture);

            if (!spriteBatchDrawable) {
                spriteBatchDrawable = new SpriteBatchDrawable(
                    this._framework, texture,
                    this._currentProjectionViewBuffer, SpriteBatch.MAX_BATCH_SIZE);
                spriteBatchDrawable.initialize();
                this._spriteBatchDrawables.set(texture, spriteBatchDrawable);
            }

            // Assign current.
            this._currentSpriteBatchDrawable = spriteBatchDrawable;
        }
    }

    /** @inheritDoc */
    public initialize() {
        this._defaultCamera = this._framework.cameraFactory.createDefaultOrthographicCamera();
        this._currentProjectionViewBuffer = this._defaultCamera.projectionViewBuffer;
        this._defaultWhiteTexture = this._framework.textureFactory.createEmpty(1, 1, Color.white());
    }
    
    /** @inheritDoc */
    public begin(projectionViewMatrix?: mat4) {
        this.end();

        if (projectionViewMatrix) {
            this._currentProjectionViewBuffer.update(projectionViewMatrix);
        }

        for (let kvp of this._spriteBatchDrawables) {
            kvp[1].reset();
        }

        // Clear current texture.
        this._currentTexture = null;
    }


    /** @inheritDoc */

    public drawRect(drawRect: Rect, color: Color, __: number = 0, _: vec2 | undefined = undefined) {
        this._checkIfNewDrawableShouldBeCreated(this._defaultWhiteTexture);

        this._tempPosition[0] = drawRect.x;
        this._tempPosition[1] = drawRect.y;
        this._tempPosition[2] = 0;
        this._tempSize[0] = drawRect.width;
        this._tempSize[1] = drawRect.height;

        this._currentSpriteBatchDrawable.writeSprite(
            this._tempPosition, this._tempSize, color
        );
    }

    /*
    /// <inheritdoc />
public void Draw(ITexture2D texture, Rect<float>drawRect, Rect<float>sourceRect, Color color,
Vector2D<float> origin,
    float rotation, Vector2D<float> rotationOrigin,
    float layerDepth)
    {
        CheckIfNewDrawableShouldBeCreated(texture);

        // Safe to assign current texture.
        _currentTexture = texture;

        float u0 = sourceRect.X / texture.Width;
        float v0 = sourceRect.Y / texture.Height;
        float u1 = (sourceRect.X + sourceRect.Width) / texture.Width;
        float v1 = (sourceRect.Y + sourceRect.Height) / texture.Height;

        float posX = drawRect.X - (drawRect.Width * origin.X);
        float posY = drawRect.Y - (drawRect.Height * origin.Y);

        _currentSpriteBatchDrawable.WriteSprite(
            new Vector3D<float>(posX, posY, layerDepth),
            new Vector2D<float>(drawRect.Width, drawRect.Height),
            color,
            rotation,
            rotationOrigin,
            u0, v0, u1, v1
        );
    }

    /// <inheritdoc />
public void Draw(ITexture2D texture,
Vector2D<float> position,
Rect<float>sourceRect,
    Color color,
    float rotation,
Vector2D<float> origin,
Vector2D<float> scale,
    bool flipSpriteHorizontally = false,
    bool flipSpriteVertically = false)
    {
        CheckIfNewDrawableShouldBeCreated(texture);

        // Safe to assign current texture.
        _currentTexture = texture;

        float xPos = position.X;
        float yPos = position.Y;

        float u0 = (float)sourceRect.X / texture.Width;
        float v0 = (float)sourceRect.Y / texture.Height;
        float u1 = (float)(sourceRect.X + sourceRect.Width) / texture.Width;
        float v1 = (float)(sourceRect.Y + sourceRect.Height) / texture.Height;

        if (flipSpriteHorizontally)
        {
            (u0, u1) = (u1, u0);
        }

        if (flipSpriteVertically)
        {
            (v0, v1) = (v1, v0);
        }

        _currentSpriteBatchDrawable.WriteSprite(
            new Vector3D<float>(xPos, yPos, 0),
            new Vector2D<float>(sourceRect.Width, sourceRect.Height) * scale,
            color,
            rotation,
            origin,
            u0, v0, u1, v1
        );
    }

    /// <inheritdoc />
public void Draw(ITexture2D texture, Rect<float>sourceRect, Vector2D<float> position, Vector2D<float> size)
    {
        CheckIfNewDrawableShouldBeCreated(texture);

        // Safe to assign current texture.
        _currentTexture = texture;

        float u0 = (float)sourceRect.X / texture.Width;
        float v0 = (float)sourceRect.Y / texture.Height;
        float u1 = (float)(sourceRect.X + sourceRect.Width) / texture.Width;
        float v1 = (float)(sourceRect.Y + sourceRect.Height) / texture.Height;

        _currentSpriteBatchDrawable.WriteSprite(new Vector3D<float>(position.X, position.Y, 0), size, u0, v0, u1, v1);
    }

    /// <inheritdoc />
public void Draw(ITexture2D texture, Rect<float>drawRect, Color color)
    {
        if (texture is null)
        {
            throw new ArgumentNullException(nameof(texture));
        }

        CheckIfNewDrawableShouldBeCreated(texture);

        // Safe to assign current texture.
        _currentTexture = texture;

        _currentSpriteBatchDrawable.WriteSprite(
            new(drawRect.X, drawRect.Y, 0),
            new(drawRect.Width, drawRect.Height),
            color);
    }

    /// <inheritdoc />
public void Draw(Rect<float>drawRect, Color color, Vector2D<float> origin = default, float rotation = 0, Vector2D<float>? rotationOrigin = null)
    {
        CheckIfNewDrawableShouldBeCreated(_defaultWhiteTexture);
        rotationOrigin ??= new Vector2D<float>(0, 0);
        _currentTexture = _defaultWhiteTexture;

        float posX = drawRect.X - (drawRect.Width * origin.X);
        float posY = drawRect.Y - (drawRect.Height * origin.Y);

        _currentSpriteBatchDrawable.WriteSprite(
            new(posX, posY, 0),
            new(drawRect.Width, drawRect.Height),
            color,
            rotation: rotation,
        rotationOrigin: rotationOrigin.Value);
    }

    /// <inheritdoc />
public void DrawString(
    SpriteFont font,
    string text,
Vector2D<float> position,
    Color? color = null,
    float scale = 1.0f)
    {
        color ??= Color.White;
        CheckIfNewDrawableShouldBeCreated(font.Texture);

        // Safe to assign current texture.
        _currentTexture = font.Texture;

        float nextCharX = 0;
        foreach (char character in text)
        {
            SpriteFontCharacter spriteFontCharacter = font[character]!;

            float x = position.X + spriteFontCharacter.Offset.X * scale + nextCharX * scale;
            float y = position.Y + spriteFontCharacter.Offset.Y * scale;

            _currentSpriteBatchDrawable.WriteSprite(new Vector3D<float>(x, y, 0), spriteFontCharacter.Size * scale,
                spriteFontCharacter.TextureCoords.A,
                spriteFontCharacter.TextureCoords.B,
                spriteFontCharacter.TextureCoords.C,
                spriteFontCharacter.TextureCoords.D,
                color.Value
            );

            nextCharX += spriteFontCharacter.Advance;
        }
    }
    /// <inheritdoc />
    ///
public void DrawString(
    SpriteFont font,
    string text,
Vector2D<float> position,
    Color color,
Vector2D<float> origin,
Vector2D<float> scale)
    {
        CheckIfNewDrawableShouldBeCreated(font.Texture);

        // Safe to assign current texture.
        _currentTexture = font.Texture;

        float nextCharX = 0;
        foreach (char character in text)
        {
            SpriteFontCharacter spriteFontCharacter = font[character]!;

            float x = position.X + spriteFontCharacter.Offset.X * scale.X + nextCharX * scale.X;
            float y = position.Y + spriteFontCharacter.Offset.Y * scale.Y;

            // Offset for origin.
            x -= origin.X * scale.X;
            y -= origin.Y * scale.Y;

            _currentSpriteBatchDrawable.WriteSprite(
                new Vector3D<float>(x, y, 0),
                spriteFontCharacter.Size * scale,
                spriteFontCharacter.TextureCoords.A,
                spriteFontCharacter.TextureCoords.B,
                spriteFontCharacter.TextureCoords.C,
                spriteFontCharacter.TextureCoords.D,
                color
            );

            nextCharX += spriteFontCharacter.Advance;
        }
    }
    */


    /** @inheritDoc */
    public end(): void {
        if (this._currentTexture != null) {
            this._currentSpriteBatchDrawable.draw();
        }
    }

    /** @inheritDoc */
    public frameEnd(): void {
        for (let drawable of this._spriteBatchDrawables) {
            drawable[1].frameEnd();
        }
    }
}