import {vec2} from "gl-matrix";
import type { SpriteBatchDrawable } from "./SpriteBatchDrawable";
import type {IFramework, ITexture2D, ISpriteBatch} from "ris-framework-api";

/**
 * The implementation of sprite batch.
 */
export class SpriteBatch implements ISpriteBatch
{
     const MAX_BATCH_SIZE = 1000;
     const ZERO_VECTOR = vec2.fromValues(0, 0);
     const CENTER_VECTOR = vec2.fromValues(0.5, 0.5);

private readonly _framework : IFramework;
private readonly  _spriteBatchDrawables : { ITexture2D : SpriteBatchDrawable } = {};
private  _currentTexture?: ITexture2D;
private _currentSpriteBatchDrawable: SpriteBatchDrawable = null!;
private _defaultCamera: OrthographicCamera = null!;

    // It is set on Begin and reset back to the default camera on End.
private IUniformBuffer _currentProjectionViewBuffer = null!;

    /// <summary>
    /// The default texture to use for "texture less" draw calls.
    /// It is white so that color multiplication works correctly.
    /// </summary>
private ITexture2D _defaultWhiteTexture = null!;

    /// <summary>
    /// The constructor.
    /// </summary>
    /// <param name="tempFramework">The <see cref="ITempFramework"/>.</param>
public SpriteBatch(ITempFramework tempFramework)
    {
        _tempFramework = tempFramework;
    }

private void CheckIfNewDrawableShouldBeCreated(ITexture2D texture)
    {
        // If there was a texture change, we need to end the current sprite batch drawable and start a new one.
        if (texture != _currentTexture)
        {
            // End will draw. This draws with a previously set sprite batch drawable.
            End();

            // Create a new sprite batch drawable if needed.
            if (!_spriteBatchDrawables.TryGetValue(texture, out SpriteBatchDrawable? spriteBatchDrawable))
            {
                spriteBatchDrawable = new SpriteBatchDrawable(_tempFramework, texture, _currentProjectionViewBuffer, MAX_BATCH_SIZE);
                spriteBatchDrawable.Initialize();
                _spriteBatchDrawables.Add(texture, spriteBatchDrawable);
            }

            // Assign current.
            _currentSpriteBatchDrawable = spriteBatchDrawable;
        }
    }


    /// <summary>
    /// Initialize the sprite batch.
    /// </summary>
public void Initialize()
    {
        _defaultCamera = _tempFramework.CameraFactory.CreateDefaultOrthographicCamera();
        _currentProjectionViewBuffer = _defaultCamera.ProjectionViewBuffer;
        _defaultWhiteTexture = _tempFramework.TextureFactory.CreateEmpty(1, 1, Color.White);
    }

    /// <inheritdoc />
public void Begin()
    {
        Begin(_currentProjectionViewBuffer);
    }

    /// <inheritdoc />
public void Begin(IUniformBuffer projectionViewBuffer)
    {
        if(_currentProjectionViewBuffer != projectionViewBuffer)
        {
            End();
            _currentProjectionViewBuffer = projectionViewBuffer;
        }

        foreach (SpriteBatchDrawable spriteBatchDrawable in _spriteBatchDrawables.Values)
        {
            spriteBatchDrawable.Reset();

            // Set the buffer again if it is different.
            if (spriteBatchDrawable.ProjectionViewBuffer != projectionViewBuffer)
            {
                spriteBatchDrawable.ProjectionViewBuffer = projectionViewBuffer;
            }
        }

        // Clear current texture.
        _currentTexture = null;
    }

    /// <inheritdoc />
public void Begin(Matrix4X4<float> projectionViewMatrix)
    {
        End();
        _currentProjectionViewBuffer.Update(projectionViewMatrix);

        foreach (SpriteBatchDrawable spriteBatchDrawable in _spriteBatchDrawables.Values)
        {
            spriteBatchDrawable.Reset();
        }

        // Clear current texture.
        _currentTexture = null;
    }

    /// <inheritdoc />
    // public void Draw(ITexture2D texture, Vector2 position, Vector2D size)
    //     => Draw(texture, new Rect(0, 0, texture.Width, texture.Height), position, size);

    /// <inheritdoc />
public void Draw(ITexture2D texture, Rect drawRect, Rect sourceRect, Color color)
    {
        CheckIfNewDrawableShouldBeCreated(texture);

        // Safe to assign current texture.
        _currentTexture = texture;

        float u0 = (float)sourceRect.X / texture.Width;
        float v0 = (float)sourceRect.Y / texture.Height;
        float u1 = (float)(sourceRect.X + sourceRect.Width) / texture.Width;
        float v1 = (float)(sourceRect.Y + sourceRect.Height) / texture.Height;

        _currentSpriteBatchDrawable.WriteSprite(
            new Vector3D<float>(drawRect.X, drawRect.Y, 0),
            new Vector2D<float>(drawRect.Width, drawRect.Height),
            color,
            u0, v0, u1, v1
        );
    }

    /// <inheritdoc />
public void Draw(ITexture2D texture, Rect<float> drawRect, Rect<float> sourceRect, Color color, float rotation)
    {
        Draw(texture, drawRect, sourceRect, color, ZeroVector, rotation, CenterVector, 0);
    }

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

    /// <inheritdoc />
public void End()
    {
        if (_currentTexture != null)
        {
            _currentSpriteBatchDrawable.Draw();
        }
    }

    /// <summary>
    /// Called on end of frame.
    /// </summary>
public void FrameEnd()
    {
        foreach (SpriteBatchDrawable drawable in _spriteBatchDrawables.Values)
        {
            drawable.FrameEnd();
        }
    }
}