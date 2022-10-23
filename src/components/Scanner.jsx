import { Fragment, useEffect, useRef, useState } from "react"

import QrScanner from "qr-scanner"

import beep from "../assets/beep.mp3"

export default () => {

    const vidRef = useRef()
    const [value, setValue] = useState(undefined)

    const [audio] = useState(new Audio(beep))

    useEffect(() => {

        // Create a new QrScanner
        const qr = new QrScanner(
            vidRef.current,
            ({ data }) => {

                if(data === value) return

                audio.pause();
                audio.currentTime = 0;
                audio.play()
                
                setValue(data)

            },
            {
                maxScansPerSecond: 60,
                highlightCodeOutline: true
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