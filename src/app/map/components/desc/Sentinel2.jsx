import React from 'react'

export default function Sentinel2() {
  return (
    <span style={{ fontSize: '12px' }}>
      <p><strong>Sentinel-2</strong> provides high-resolution images in the visible and infrared wavelengths, to monitor vegetation, soil and water cover, inland waterways and coastal areas. </p>
      <br />
      <p><strong>Spatial resolution</strong>: 10m, 20m, and 60m, depending on the wavelength (that is, only details bigger than 10m, 20m, and 60m can be seen). </p>
      <br />
      <p><strong>Revisit time</strong>: maximum 5 days to revisit the same area, using both satellites.</p>
      <br />
      <p><strong>Data availability</strong>: Since June 2015. Full global coverage since March 2017.</p>
      <br />
      <p><strong>Common usage</strong>: Land-cover maps, land-change detection maps, vegetation monitoring, monitoring of burnt areas.</p>

    </span>
  )
}
