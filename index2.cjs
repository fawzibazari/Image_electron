// import slash from 'slash';


const path = require('path');
const os = require('os');
const { app, browser, BrowserWindow , Menu, globalShortcut, ipcMain, shell} = require('electron');
// const imagemin = require('imagemin');
// const imageminMozjpeg = require('imagemin-mozjpeg');
// const imageminPngquant = require('imagemin-pngquant');
const slash = require('slash'); 


process.env.NODE_ENV = 'development'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false


console.log(process.platform)

let MainWindow
let AboutWindow

function createMainWindow () {

     MainWindow = new BrowserWindow({
        title: "Fawzi Image",
        width: isDev ? 700 : 500,
        height: 600,
        icon: './assets/icon/Icon_256x256.png',
        resizable: isDev ? true : false,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false

        }
    })

    if(isDev) {
        MainWindow.webContents.openDevTools()
    }

    // MainWindow.loadURL(`file://${__dirname}/app/index.html`)
    MainWindow.loadFile('./app/index.html')

}

function createAboutWindow () {

    AboutWindow = new BrowserWindow({
       title: "A propos de Fawzi Image", 
       width: 300,
       height: 300,
       icon: './assets/icon/Icon_256x256.png',
       resizable: isDev ? true : false,
       backgroundColor: 'white',
   })

   // MainWindow.loadURL(`file://${__dirname}/app/index.html`)
   AboutWindow.loadFile('./app/about.html')

}
app.on('ready', () => {
    createMainWindow() 

    // const mainMenu = Menu.buildFromTemplate(menu)

    // Menu.setApplicationMenu(mainMenu)

    // globalShortcut.register('CmdOrCtrl+R', () => MainWindow.reload())
    // globalShortcut.register(isMac ?'Cmd+Alt+I' : 'Ctrl+Shift+I', () => MainWindow.toggleDevTools())


    MainWindow.on('ready', () => MainWindow = null)
})

const menu = [
    ...(isMac ? [{ label: app.name,
                    submenu: [
                        {
                            label: 'About',
                            click: createAboutWindow 
                        }
                    ]
    }] : []),


    {
       role: 'fileMenu'
    },
    (isDev ? [
        {
            label: 'Developer',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {type: 'separator'},
                {role: 'toggledevtools'}
            ]
        }
    ]: [])
    ]

    // ipcMain.on('image:minimize', (e, options) => {
    //     options.dest = path.join(os.homedir(), 'imageshrink')
    //     shrinkImage(options)
    // })
    
//     async function shrinkImage(imgPath, quality, dest){
// try {
//     const pngQuality = quality / 100

//     const files = await imagemin([slash(imgPath)], {
//         destination: dest,
//         plugins: [
//             imageminMozjpeg({ quality }), 
//             imageminPngquant({
//                 quality: [pngQuality, pngQuality]
//             })
//         ]
//     })

//     console.log(files)

//     // shell.openItem(dest)

// } catch (err) {
//     console.log(err)
// }
//     }




app.on('window-all-closed', function () {
    if (!isMac) app.quit()
  })

  app.on('activate', function () { 
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })

