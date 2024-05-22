import React from 'react'

export default function Landsat89() {
  return (
    <span style={{fontSize: '12px'}}>
        <p>The <strong>Landsat 8-9 </strong> ollection contains imagery from the two most recently launched Landsat satellites (Landsat 8 and Landsat 9, provided by NASA/USGS). Both carry the Operational Land Imager (OLI) and the Thermal Infrared Sensor (TIRS), with 9 optical and 2 thermal bands. These two sensors provide seasonal coverage of the global landmass.</p>
        <br />
        <p><strong>Spatial resolution</strong>: 15 m for the panchromatic band and 30 m for the rest (the thermal bands is re-sampled from 100 m).</p>
        <br />
        <p><strong>Revisit time</strong> 16 days</p>
        <br />
        <p><strong>Data availability</strong>: Since February 2013.</p>
        <br />
        <p><strong>Common Usage</strong>: Vegetation monitoring, land use, land cover maps, change monitoring, etc.</p>
    </span>
  )
}
