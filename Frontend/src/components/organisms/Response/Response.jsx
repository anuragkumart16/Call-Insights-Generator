import React, { useRef, useState } from 'react'
import html2pdf from 'html2pdf.js'
import './response.css'

function Response({ response, setOpenDialog }) {
    const [showMore, setShowMore] = useState(false)
    const DivRef = useRef(null)

    const handleDownload = () => {
        const opt = {
            margin: 0.5,
            filename: 'call-report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }
        html2pdf().set(opt).from(DivRef.current).save()
    }

    return (
        <div className='response-div' ref={DivRef}>
            <div className='btn-holder'>
                <button onClick={() => setOpenDialog(false)}>Close</button>
                <button onClick={handleDownload}>Export</button>
            </div>

            <div className='request-info'>
                <h2>Request Info</h2>
                <p>Agent Id: {response.agentId || 'N/A'}</p>
                <p>Customer Id: {response.customerId || 'N/A'}</p>
                <p>Audio Link: <a href={response.audioLink || null} target="_blank" rel="noreferrer">{response.audioLink || 'N/A'}</a></p>
            </div>

            <div className='request-info'>
                <h2>Database Instance Info</h2>
                <p>QueryId: {response._id || 'N/A'}</p>
                <p>Created Date: {response.createdAt || 'N/A'}</p>
                <p>Modified Date: {response.updatedAt || 'N/A'}</p>
            </div>

            <div className='response-info'>
                <h2>Transcription</h2>
                {showMore
                    ? <p>{response.audioTranscript} <span className='toggle-text' onClick={() => setShowMore(false)}>Show less</span></p>
                    : <p>{response.audioTranscript.slice(0, 500)}... <span className='toggle-text' onClick={() => setShowMore(true)}>Show More</span></p>
                }
            </div>

            <div className='response-info'>
                <h2>Call Insights</h2>
                <div className='insights-container'>
                    {Object.entries(response.callInsight).map(([sectionKey, sectionValue]) => (
                        <div key={sectionKey} className='insight-section'>
                            <h2 className='insight-title'>{sectionKey.replaceAll('_', ' ')}</h2>
                            <table className='insight-table'>
                                <tbody>
                                    {typeof sectionValue === 'object' && !Array.isArray(sectionValue) &&
                                        Object.entries(sectionValue).map(([key, value], idx) => (
                                            <tr key={key} className={idx % 2 === 0 ? 'even-row' : 'odd-row'}>
                                                <td className='key-cell'>{key.replaceAll('_', ' ')}</td>
                                                <td className='value-cell'>
                                                    {Array.isArray(value) ? (
                                                        <ul className='value-list'>
                                                            {value.map((item, i) => (
                                                                <li key={i}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        value
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Response
