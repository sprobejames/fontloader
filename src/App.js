import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import _ from 'underscore'

const API_URL = 'https://content-webfonts.googleapis.com/v1/webfonts'
const API_KEY = 'AIzaSyC-q23_Sovz3BIqdDNa5Qb11Rco4yWoTXo'

function App() {
  const [fonts, setFonts] = useState([])
  const [font, setFont] = useState('Arial')
  const [fontSize, setFontSize] = useState(14)
  const [fontColor, setFontColor] = useState('#000000')
  const [fontSizeList, setFontSizeList] = useState([])
  const [fontFamily, setFontfamily] = useState(null)
  const [fontWeights, setFontWeights ] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/?sort=ALPHA&key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setFonts(data.items)
      })

    let sizes = [];

    for (let i = 10; i <= 100; i++) {
      sizes.push(i);
    }

    setFontSizeList(sizes)
  }, [])

  useEffect(() => {
    if (fonts) {
      const selected = _.findWhere(fonts, { family: font })
      setFontfamily(selected)
    }

    // console.log(selected)
    // let weights = selected.variants.join(';')
    // console.log(weights)
    // weights.replace('regular', 400)
    // weights.replace('/italic/gi', ':1')
    // setFontWeights(weights)
  }, [font])

  return (
    <div className="App">
      <select value={font} onChange={ e => setFont(e.target.value) }>
        {
          fonts.map((font, key) => {
            return (
              <option key={key} value={font.family}>{ font.family }</option>
            )
          })
        }
      </select>

      <select value={fontSize} onChange={ e => setFontSize(e.target.value) }>
        {
          fontSizeList.length > 0 && 
          fontSizeList.map((size, key) => {
            return (
              <option key={key} value={size}>{ size }</option>
            )
          })
        }
      </select>

      <input type="color" value={fontColor} onChange={ e => setFontColor(e.target.value) }></input>

      {
        (font != 'Arial') &&
        <Helmet>
          <link href={`//fonts.googleapis.com/css2?family=${font.replace(' ', '+')}&display=swap`} rel="stylesheet" />
        </Helmet>
      }

      <div>
        <span style={{ fontFamily:font, fontSize: fontSize + 'px', color: fontColor }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod feugiat enim eu malesuada. Integer sit amet pharetra magna. Suspendisse congue luctus fermentum. Nunc id nunc euismod, aliquam odio vel, lacinia dui. Quisque consectetur augue metus, sit amet bibendum ipsum malesuada sit amet. Donec id sem tellus. Morbi eu maximus erat. Mauris in nulla augue. Phasellus luctus et sem ac elementum. Integer non diam tellus. Aliquam commodo leo risus, ac bibendum magna bibendum id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam posuere pretium nulla tempor laoreet. Cras elementum feugiat metus, a interdum massa auctor sed.</span>
      </div>
    </div>
  );
}

export default App;
