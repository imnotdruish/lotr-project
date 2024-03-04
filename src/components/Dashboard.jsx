import React, { useState, useEffect } from 'react'
import useFetchData from '../hooks/useFetchData'
import Books from './Books'
import Characters from './Characters'
import Movies from './Movies'
import styles from './dashboard.module.css'
import Options from './Options'
import Loader from './Loader'

export default function Dashboard() {
  const [selection, setSelection] = useState(null)
  const {data, loading, error} = useFetchData(selection)

  function onClickHandler(clickedButton) {
    return () => {
      setSelection(clickedButton)
    }
  }

  const dataRender = {
    'character': <Characters data={data} />,
    'book': <Books data={data} />,
    'movie': <Movies data={data} />,
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.layout}>
        <h1 style={{margin: '0 auto'}}>Lord of the Rings Info</h1>
        <Options selection={selection} setSelection={onClickHandler}/>
        <div className={styles.infoPanel}>
          {loading && (
            <Loader />
          )}
          {(data && !loading) && (
            dataRender[selection]
          )}
        </div>
      </div>

    </div>
  )
}
