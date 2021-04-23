import React, { useEffect, useState, useMemo } from 'react'
import { createGlobalStyle } from 'styled-components'

import {
  FONT_TYPE_FETCH,
  FONT_TYPE_REQUIRE,
  FontLoaderSpecs,
} from '../../constant/font'

import { buildURLFontCss, createFontStyle } from './style'

type Props = {
  fontLoaderSpecs: FontLoaderSpecs
}

export const FontStyle: React.FC<Props> = (props) => {
  // Extract spec of type of FETCH
  const fetchSpecs = useMemo(() => {
    return Object.values(props.fontLoaderSpecs).filter(
      (spec): spec is FONT_TYPE_FETCH => spec.type === 'FETCH',
    )
  }, [props.fontLoaderSpecs])

  // Extract spec of type of REQUIRE
  const requireSpecs = useMemo(() => {
    return Object.values(props.fontLoaderSpecs).filter(
      (spec): spec is FONT_TYPE_REQUIRE => spec.type === 'REQUIRE',
    )
  }, [props.fontLoaderSpecs])

  // Run Fetch
  const [fetchedFonts, setFetchedFonts] = useState([])
  useEffect(() => {
    Promise.all(
      fetchSpecs.map((spec) => {
        return fetch(spec.url)
          .then((res) => {
            return res.text()
          })
          .then((res) => {
            return res.replace(
              spec.fontFamilyReplaceFrom,
              spec.fontFamilyReplaceTo,
            )
          })
      }),
    ).then((res) => {
      setFetchedFonts(res)
    })
  }, [fetchSpecs])

  // Run Require
  const requiredFonts = useMemo(() => {
    return requireSpecs.map((spec) => {
      return buildURLFontCss({
        fontFamily: spec.fontFamily,
        url: spec.url,
      })
    })
  }, [requireSpecs])

  // Create Font Style
  const StyledFont = useMemo(() => {
    const fontCss = createFontStyle([...fetchedFonts, ...requiredFonts])
    return createGlobalStyle`
        ${fontCss}
      `
  }, [fetchedFonts, requiredFonts])

  return <StyledFont />
}
