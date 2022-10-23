import { Fragment, useEffect, useRef, useState } from "react"

import QrScanner from "qr-scanner"

export default () => {

    const vidRef = useRef()
    const [value, setValue] = useState(undefined)

    useEffect(() => {

        // Create a new QrScanner
        const qr = new QrScanner(
            vidRef.current,
            ({ data }) => setValue(data),
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