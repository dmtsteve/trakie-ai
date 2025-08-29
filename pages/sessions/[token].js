import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SessionUpload() {
  const router = useRouter();
  const { token } = router.query;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('invoice');
  const [cameraActive, setCameraActive] = useState(false);
  const [extractedData, setExtractedData] = useState([]);
  const [currentCapture, setCurrentCapture] = useState(null);
  const [processing, setProcessing] = useState(false);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280, max: 1920 },
          height: { ideal: 720, max: 1080 }
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraActive(true);
        };
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      alert('Camera access is required for scanning. Please allow camera permissions.');
    }
  };

  // Capture image
  const captureImage = async () => {
    if (!videoRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCurrentCapture(imageData);
    setProcessing(true);
    
    // Simulate OCR processing
    setTimeout(() => {
      if (activeTab === 'invoice') {
        processInvoiceData(imageData);
      } else {
        processProductData(imageData);
      }
      setProcessing(false);
    }, 2000);
  };

  // Mock OCR processing functions
  const processInvoiceData = (imageData) => {
    const mockInvoiceData = [
      {
        brand: 'The Bettering Company',
        product: '10mG Gummy Slumber (Midnight Cherry)',
        vendor: 'NOWAVE LLC',
        quantity: '20 ea',
        costEach: 12.84,
        total: 256.88,
        strain: 'Slumber',
        type: 'Midnight Cherry',
        category: '100mg Edible'
      }
    ];
    setExtractedData(prev => [...prev, ...mockInvoiceData]);
  };

  const processProductData = (imageData) => {
    const mockProductData = {
      brand: 'THE BETTERING COMPANY',
      strain: 'Slumber',
      type: 'Midnight Cherry',
      thc: '9.10',
      cbd: '4.61',
      unit: 'MG',
      expiration: '05/08/2026',
      barcode: '850063095044',
      category: 'Edible'
    };
    setExtractedData(prev => [...prev, mockProductData]);
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0a0a1a 30%, #1a1a2e 70%, #0f1419 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif'
    }}>
      
      {/* Header */}
      <div style={{
        padding: '32px 24px',
        background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(60px)',
        borderBottom: '1px solid rgba(0, 255, 204, 0.15)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.6)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '12px'
        }}>
          <img 
            src="/icon48.png" 
            alt="trakie logo" 
            style={{
              width: '120px',
              height: '120px',
              filter: 'drop-shadow(0 0 25px #00ffcc) drop-shadow(0 0 50px #00ffcc) drop-shadow(0 0 75px rgba(0, 255, 204, 0.3))'
            }}
          />
          <h1 style={{
            color: 'white',
            fontSize: '36px',
            fontWeight: '200',
            margin: 0,
            letterSpacing: '4px',
            textShadow: '0 0 20px rgba(0, 255, 204, 0.3)'
          }}>trakie</h1>
        </div>
        <p style={{
          color: 'rgba(78, 205, 196, 0.8)',
          fontSize: '16px',
          margin: 0,
          textAlign: 'center',
          fontWeight: '300',
          letterSpacing: '2px'
        }}>Session {sessionToken || urlToken}</p>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        margin: '0 24px',
        marginTop: '32px',
        background: 'rgba(0,0,0,0.6)',
        borderRadius: '20px',
        padding: '8px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(78, 205, 196, 0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        {[
          { key: 'invoice', label: 'Invoice Scan', icon: '📋' },
          { key: 'product', label: 'Product Photos', icon: '📦' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              flex: 1,
              padding: '20px',
              border: 'none',
              background: activeTab === tab.key 
                ? 'linear-gradient(135deg, #4ECDC4 0%, #00d4ff 100%)'
                : 'transparent',
              color: activeTab === tab.key ? '#0a0a0a' : 'rgba(78, 205, 196, 0.8)',
              fontSize: '16px',
              fontWeight: activeTab === tab.key ? '600' : '400',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: activeTab === tab.key 
                ? '0 0 30px rgba(78, 205, 196, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'
                : 'none',
              letterSpacing: '1px'
            }}
          >
            <span style={{ marginRight: '10px', fontSize: '18px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Camera Interface */}
      <div style={{
        margin: '24px 20px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '20px',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        
        {!cameraActive ? (
          <div style={{
            padding: '60px 40px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              background: 'linear-gradient(135deg, #4ECDC4 0%, #2E8B8B 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>📷</div>
            
            <h2 style={{
              color: 'white',
              fontSize: '24px',
              fontWeight: '600',
              margin: '0 0 12px',
              letterSpacing: '1px'
            }}>
              {activeTab === 'invoice' ? 'Scan Invoice' : 'Capture Products'}
            </h2>
            
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: '0 0 32px',
              maxWidth: '280px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              {activeTab === 'invoice' 
                ? 'Position invoice clearly in frame. Auto-capture when text is detected.'
                : 'Capture product labels with brand, strain, and THC info visible.'
              }
            </p>
            
            <button
              onClick={startCamera}
              style={{
                background: 'linear-gradient(135deg, #4ECDC4 0%, #2E8B8B 100%)',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                padding: '16px 40px',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(78, 205, 196, 0.4)',
                transition: 'all 0.3s ease',
                transform: 'translateY(0)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0px)'}
            >
              Start Camera
            </button>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '20px'
              }}
            />
            
            {/* Capture Overlay */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: activeTab === 'invoice' ? '90%' : '70%',
              height: activeTab === 'invoice' ? '80%' : '60%',
              border: '3px solid #4ECDC4',
              borderRadius: '16px',
              background: 'rgba(78, 205, 196, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none'
            }}>
              <div style={{
                color: '#4ECDC4',
                fontSize: '18px',
                fontWeight: '600',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.7)',
                padding: '12px 20px',
                borderRadius: '25px',
                backdropFilter: 'blur(10px)'
              }}>
                {activeTab === 'invoice' ? 'Position Invoice Here' : 'Center Product Label'}
              </div>
            </div>
            
            {/* Camera Controls */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}>
              <button
                onClick={stopCamera}
                style={{
                  background: 'rgba(0,0,0,0.7)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '20px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                ✕
              </button>
              
              <button
                onClick={captureImage}
                disabled={processing}
                style={{
                  background: processing 
                    ? 'rgba(255,255,255,0.3)' 
                    : 'linear-gradient(135deg, #4ECDC4 0%, #2E8B8B 100%)',
                  border: 'none',
                  color: 'white',
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  cursor: processing ? 'not-allowed' : 'pointer',
                  fontSize: '24px',
                  boxShadow: '0 8px 30px rgba(78, 205, 196, 0.4)',
                  transition: 'all 0.3s ease'
                }}
              >
                {processing ? '⏳' : '📷'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Extracted Data Preview */}
      {extractedData.length > 0 && (
        <div style={{
          margin: '0 20px 24px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '16px',
          padding: '24px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: '600',
            margin: '0 0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ✓ Extracted Data
          </h3>
          
          {extractedData.map((item, index) => (
            <div key={index} style={{
              background: 'rgba(78, 205, 196, 0.1)',
              border: '1px solid rgba(78, 205, 196, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '12px',
              fontSize: '14px',
              color: 'white'
            }}>
              {activeTab === 'invoice' ? (
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '8px', color: '#4ECDC4' }}>
                    {item.brand} | {item.strain || ''} | {item.type || ''} | {item.category}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                    Vendor: {item.vendor} • Qty: {item.quantity} • Cost: ${item.costEach} • Total: ${item.total}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '8px', color: '#4ECDC4' }}>
                    {item.brand} | {item.strain || ''} | {item.type || ''} | {item.category}
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.8)' }}>
                    THC: {item.thc}{item.unit} • CBD: {item.cbd}{item.unit} • Exp: {item.expiration}
                    {item.barcode && ` • Barcode: ${item.barcode}`}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Process Button */}
      {extractedData.length > 0 && (
        <div style={{
          padding: '0 20px 40px',
          textAlign: 'center'
        }}>
          <button
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
              border: 'none',
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              padding: '18px 50px',
              borderRadius: '50px',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => alert('Ready to send to Dutchie inventory system!')}
          >
            Process {extractedData.length} Item{extractedData.length > 1 ? 's' : ''} → Dutchie
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}