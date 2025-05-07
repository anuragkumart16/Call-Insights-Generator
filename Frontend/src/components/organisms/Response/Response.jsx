import React, { useRef, useState } from 'react'
import html2pdf from 'html2pdf.js';
import './response.css'
function Response({ response, setOpenDialog }) {
    const [showMore, setShowMore] = useState(false)
    const DivRef = useRef(null)
    const handleDownload = () => {
        const opt = {
          margin:       0.5,
          filename:     'call-report.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2 },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
      
        html2pdf().set(opt).from(DivRef.current).save();
      };
    return (
        <div className='response-div' ref={DivRef} >
            <div className='btn-holder'> 
                <button onClick={() => setOpenDialog(false)}>Close</button> 
                <button onClick={handleDownload}>Export</button> 
            </div>
            <div className='request-info'>
                <h2>Request Info</h2>
                <p>Agent Id: {response.agentId || 'N/A'} </p>
                <p>Customer Id: {response.customerId || 'N/A'}</p>
                <p>Audio Link: <a href={response.audioLink || null} target="_blank">{response.audioLink || 'N/A'}</a></p>
            </div>

            <div className='request-info'>
                <h2>Database Instance Info</h2>
                <p>QueryId: {response._id || 'N/A'} </p>
                <p>Created Date: {response.createdAt || 'N/A'}</p>
                <p>Modified Date: {response.updatedAt || 'N/A'}</p>
            </div>

            <div className='response-info'>
                <h2>Transcription</h2>
                {showMore
                    ? <p>{response.audioTranscript} <span style={{ cursor: 'pointer', color: '#E3E3E3', textDecoration: 'underline' }} onClick={() => setShowMore(false)}>Show less</span></p>
                    : <p>{response.audioTranscript.slice(0, 500)}... <span style={{ cursor: 'pointer', color: '#E3E3E3', textDecoration: 'underline' }} onClick={() => setShowMore(true)}>Show More</span></p>
                }
            </div>

            <div className='response-info'>
                <h2>Call Insights</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {Object.entries(response.callInsight).map(([sectionKey, sectionValue]) => (
                        <div key={sectionKey} style={{ margin: '2rem' }}>
                            <h2 style={{ textTransform: 'capitalize' }}>{sectionKey.replaceAll('_', ' ')}</h2>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid grey', borderRadius: '1rem' ,marginTop: '1rem'}}>
                                <tbody>
                                    {typeof sectionValue === 'object' && !Array.isArray(sectionValue) &&
                                        Object.entries(sectionValue).map(([key, value], idx) => (
                                            <tr
                                                key={key}
                                                style={{
                                                    backgroundColor: idx % 2 === 0 ? '#242424' : '#424242',
                                                }}
                                            >
                                                <td style={{ padding: '12px', fontWeight: 'bold', textTransform: 'capitalize', width: '30%' }}>
                                                    {key.replaceAll('_', ' ')}
                                                </td>
                                                <td style={{ padding: '12px' }}>
                                                    {Array.isArray(value) ? (
                                                        <ul style={{ margin: 0, paddingLeft: '1rem' }}>
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
