import { Fragment, useEffect, useRef, useState } from "react"

import QrScanner from "qr-scanner"
import useSound from "use-sound"

import beep from "../assets/beep.mp3"

export default () => {

    const vidRef = useRef()
    const [value, setValue] = useState(undefined)

    const [playSound] = useSound(beep)

    useEffect(() => {

        // Create a new QrScanner
        const qr = new QrScanner(
            vidRef.current,
            ({ data }) => {
                playSound()
                setValue(data)
            },
            {
                maxScansPerSecond: 60
            }
        )

        // Start the scanner
        qr.start()

        // Release camera on component removal
        return () => qr.stop()
        
    }, [])

    return(
        <Fragment>
            <video style={{ width: "100%", aspectRatio: "1", objectFit: "cover", maxWidth: "600px", borderRadius: "10px"}} ref={vidRef}></video>
            <p style={{ textAlign: "center" }}>{value ?? "Scan a QR code"}</p>
        </Fragment>
    )

}