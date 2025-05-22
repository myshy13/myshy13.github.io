// Modules to control application life and create native browser window
const {app, BrowserWindow, screen} = require('electron')
const path = require('path')
const os = require('os');
app.allowRendererProcessReuse = false;

const DEV_ENV = process.env.APP_DEV ? process.env.APP_DEV : false;
const WM_SIZING = 0x0214;
const WM_SIZING_MSG = {
  LEFT: 1,
  RIGHT: 2,
  TOP: 3,
  TOPLEFT: 4,
  TOPRIGHT: 5,
  BOTTOM: 6,
  BOTTOMLEFT: 7,
  BOTTOMRIGHT: 8
};

class AspectRatioBrowserWindow extends BrowserWindow
{
  _aspectRatio = null;
  _aspectRatioExtraSize = null;
  _resizeDirection = null;

  constructor(options)
  {
    super(options);

    // BrowserWindow.setAspectRatio() is not implemented for Windows, register
    // custom resize handler to apply aspectRatio until that PR got accepted:
    // https://github.com/electron/electron/pull/18306
    if(process.platform === 'win32')
    {
      this.on('will-resize', this._handleWillResize);
      this.hookWindowMessage(WM_SIZING, (wParam) =>
      {
        this._resizeDirection = wParam.readUIntBE(0, 1);
      });
    }
  }

  setAspectRatio(aspectRatio, extraSize)
  {
    this._aspectRatio = aspectRatio || null;
    this._aspectRatioExtraSize = extraSize || null;
    if(process.platform !== 'win32')
    {
      super.setAspectRatio(aspectRatio, extraSize);
    }
  }

  _handleWillResize(event, screenBounds)
  {
    if(!this._aspectRatio || !this._resizeDirection)
    {
      return;
    }

    event.preventDefault();

    const rawBounds = screen.screenToDipRect(this, screenBounds);
    const newBounds = {...rawBounds};

    const [minWidth, minHeight] = this.getMinimumSize();
    if(newBounds.width < minWidth || newBounds.height < minHeight)
    {
      return;
    }

    let extraWidth = 0;
    let extraHeight = 0;
    if(this._aspectRatioExtraSize)
    {
      extraWidth = this._aspectRatioExtraSize.width || 0;
      extraHeight = this._aspectRatioExtraSize.height || 0;
    }

    const getHeightFromWidth = (width) =>
      Math.max(minHeight, Math.floor((width - extraWidth) / this._aspectRatio + extraHeight));
    const getWidthFromHeight = (height) =>
      Math.max(minWidth, Math.floor((height - extraHeight) * this._aspectRatio + extraWidth));

    // resize window
    switch(this._resizeDirection)
    {
      case WM_SIZING_MSG.LEFT:
      case WM_SIZING_MSG.RIGHT:
        newBounds.height = getHeightFromWidth(rawBounds.width);
        break;
      case WM_SIZING_MSG.TOP:
      case WM_SIZING_MSG.BOTTOM:
        newBounds.width = getWidthFromHeight(rawBounds.height);
        break;
      case WM_SIZING_MSG.BOTTOMLEFT:
      case WM_SIZING_MSG.BOTTOMRIGHT:
      case WM_SIZING_MSG.TOPLEFT:
      case WM_SIZING_MSG.TOPRIGHT:
        const widthMagnitude = rawBounds.width * getHeightFromWidth(rawBounds.width);
        const heightMagnitude = rawBounds.height * getWidthFromHeight(rawBounds.height);
        if(widthMagnitude > heightMagnitude)
        {
          newBounds.height = getHeightFromWidth(rawBounds.width);
        } else
        {
          newBounds.width = getWidthFromHeight(rawBounds.height);
        }
        break;
      default:
    }

    // move window
    switch(this._resizeDirection)
    {
      case WM_SIZING_MSG.TOPLEFT:
        newBounds.x += rawBounds.width - newBounds.width;
        newBounds.y += rawBounds.height - newBounds.height;
        break;
      case WM_SIZING_MSG.TOPRIGHT:
        newBounds.y += rawBounds.height - newBounds.height;
        break;
      case WM_SIZING_MSG.BOTTOMLEFT:
        newBounds.x += rawBounds.width - newBounds.width;
        break;
      default:
    }

    this.setBounds(newBounds);
  }
}

function createWindow()
{
  const mainWindow = new AspectRatioBrowserWindow({
    width: 1280,
    height: 720,
    resizable: true,
    icon: path.join(__dirname, 'icon.webp'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true
    }
  })

  mainWindow.loadFile('index.html');
  mainWindow.setAspectRatio((16 / 9));

  if(!DEV_ENV)
  {
    mainWindow.setMenu(null);
  }
  //mainWindow.setAutoHideMenuBar(true);
}

app.whenReady().then(() =>
{
  createWindow()
  app.on('activate', function ()
  {
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

app.on('window-all-closed', function ()
{
  if(process.platform !== 'darwin') app.quit();
})