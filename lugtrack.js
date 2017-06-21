let advertise = false
let now1 = 0
let now = 0
let Xold = 0
let Yold = 0
let movement = false
let Zold = 0
let timet = 12 //The Device turns itself back ON once the device stands still for 12 minutes
let Xthreshold = 0
let Ymovement = 0
let Ythreshold = 0
let Xmovement = 0
let Zthreshold = 0
let Zmovement = 0
bluetooth.onBluetoothConnected(() => {

})
bluetooth.onBluetoothDisconnected(() => {

})
basic.forever(() => {
    Zmovement = input.acceleration(Dimension.Z)
    Xmovement = input.acceleration(Dimension.X)
    Ymovement = input.acceleration(Dimension.Y)
    if (Zmovement != Zold) {
        // basic.showString("x")
        if (Zmovement < Zold - Zthreshold || Zmovement > Zold + Zthreshold) {
            Zold = Zmovement
            movement = true
            basic.showString("Z")
        }
    }
    if (Ymovement != Yold) {
        // basic.showString("x")
        if (Ymovement < Yold - Ythreshold || Ymovement > Yold + Ythreshold) {
            Yold = Ymovement
            movement = true
            basic.showString("Y")
        }
    }
    if (Xmovement != Xold) {
        // basic.showString("x")
        if (Xmovement < Xold - Xthreshold || Xmovement > Xold + Xthreshold) {
            Xold = Xmovement
            movement = true
            basic.showString("X")
        }
    }
    if (movement) {
        movement = false
        now1 = input.runningTime()
        advertise = false
        bluetooth.stopAdvertising()
        basic.pause(500)
        basic.clearScreen()
    } else {
        now = input.runningTime()
        if (now > now1 + timet * 1000 * 60) {
            if (advertise == false) {
                basic.showString("F")
                bluetooth.advertiseUrl(
                    "http://www.google.com",
                    7,
                    false
                )
                advertise = true
            }
        }
    }
})
advertise = false
now1 = 0
now = 0
Xold = 0
Yold = 0
movement = false
Zold = 0
timet = 12 //The Device turns itself back ON once the device stands still for 12 minutes
Xthreshold = 0
Ymovement = 0
Ythreshold = 0
Xmovement = 0
Zthreshold = 0
Zmovement = 0
bluetooth.stopAdvertising()
