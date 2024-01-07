import React, { useEffect, useRef, useState } from 'react'

export const Styro = ({
  style = {},
  className = '',
  play = true,
  delay = 0,
  loop = 0,
  onHoverPause = false,
  onClickPause = false,
  onFinish,
  completeCycle,
  direction = 'left',
  speed = 30,
  gradient = true,
  gradientColor = [255, 255, 255],
  gradientWidth = 200,
  children,
}) => {
  //Hooks
  const [widthContainer, setWidthContainer] = useState(0)
  const [styroWidth, setStyroWidth] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const refContainer = useRef(null)
  const styroRef = useRef(null)

  useEffect(() => {
    if (!isMounted) return

    //Observing width of container/StyroMarquee
    const determineWidth = () => {
      if (styroRef.current && refContainer.current) {
        setWidthContainer(
          refContainer.current.getBoundingClientRect().width / 2
        )
        setStyroWidth(styroRef.current.getBoundingClientRect().width) / 2
      }
    }

    determineWidth()

    //Handling the size
    window.addEventListener('resize', determineWidth)
    return () => {
      window.addEventListener('resize', determineWidth)
    }
  }, [isMounted])

  //Handling initial resize

  useEffect(() => {
    setIsMounted(true)
  })

  //Initial gradient colour

  const rgbaGradientColor = `rgba(${gradientColor[0]}, ${gradientColor[1]}, ${gradientColor[2]})`

  //Duration of Animation
  const duration =
    styroWidth < widthContainer ? widthContainer / speed : styroWidth / speed

  return (
    <>
      {isMounted ? null : (
        <div
          ref={refContainer}
          style={{
            ...style,
            ['--pause-on-hover']: !play || onHoverPause ? 'pause' : 'running',
            ['--pause-on-click']:
              !play || (onHoverPause && !onClickPause) || onClickPause
                ? 'paused'
                : 'running',
          }}
          className={`${className} marquee-container`}
        >
          {gradient && (
            <div
              style={{
                ['--gradient-color']: `${rgbaGradientColor}, 1), ${rgbaGradientColor}, 0)`,
                ['--gradient-width']:
                  typeof gradientWidth === 'number'
                    ? `${gradientWidth}px`
                    : gradientWidth,
              }}
              className='overlay'
            />
          )}
          {
            <div
              ref={styroRef}
              style={{
                '--play': play ? 'running' : 'paused',
                '--direction': direction === 'left' ? 'normal' : 'reverse',
                '--duration': `${duration}s`,
                '--delay': `${delay}s`,
                '--iteration-count': !!loop ? `${loop}` : 'infinite',
              }}
              className='marquee'
              onAnimationIteration={completeCycle}
              onAnimationEnd={onFinish}
            >
              {children}
            </div>
          }
          {
            <div
              style={{
                '--play': play ? 'running' : 'paused',
                '--direction': direction === 'left' ? 'normal' : 'reverse',
                '--duration': `${duration}s`,
                '--delay': `${delay}s`,
                '--iteration-count': !!loop ? `${loop}` : 'infinite',
              }}
              className='marquee'
              aria-hidden='true'
            >
              {children}
            </div>
          }
        </div>
      )}
    </>
  )
}

// export default StyroMarquee
