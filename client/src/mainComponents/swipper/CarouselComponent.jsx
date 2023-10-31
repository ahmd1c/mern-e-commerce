/* eslint-disable react/prop-types */
import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import "./carousal.css"


export const EmblaCarousel = ({list}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop : false} , [Autoplay({delay : 2000})])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {list}
        </div>
      </div>
      <div className="embla__buttons">
      <button className="embla__prev" onClick={scrollPrev}>
        <svg className="embla__icon" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button className="embla__next" onClick={scrollNext}>
        <svg className="embla__icon" width="24" height="24" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
      </div>
    </div>
  )
}
