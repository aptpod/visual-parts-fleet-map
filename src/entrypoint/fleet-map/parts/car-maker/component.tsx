import React, { memo } from 'react'

type Props = {
  selected: boolean
  rotationAngle: number
}

export const CarMarker: React.VFC<Props> = memo((props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="64"
      height="64"
      viewBox="0 0 64 64"
    >
      {props.selected && (
        <circle
          fill="rgba(47, 172, 255, 0.2"
          stroke="#2facff"
          strokeWidth="1"
          cx="32"
          cy="32"
          r="31"
        />
      )}

      <g transform={`rotate(${props.rotationAngle}, 30, 30)`}>
        <g transform="translate(22 7)">
          <defs>
            <path id="5oyf5d275a" d="M0 50L19.42 50 19.42 0 0 0z" />
          </defs>
          <g fill="none" fillRule="evenodd">
            <g>
              <g>
                <g transform="translate(-828 -509) translate(828 509) translate(.29)">
                  <path
                    fill="#FFF"
                    d="M13.846.91c.792-.294 1.466-.323 2.396.077.747.386 1.263.856 1.514 1.793L13.846.91M5.587.91C4.795.616 4.12.587 3.19.987c-.747.386-1.263.856-1.514 1.793L5.587.91"
                  />
                  <mask id="wa3tkirsxb" fill="#fff">
                    <use xlinkHref="#5oyf5d275a" />
                  </mask>
                  <path
                    fill="#C6E6EF"
                    d="M1.758 15.257L17.662 15.257 17.662 5.139 1.758 5.139z"
                    mask="url(#wa3tkirsxb)"
                  />
                  <path
                    fill="#FFF"
                    d="M1.71 49L17.71 49 17.71 17 1.71 17z"
                    mask="url(#wa3tkirsxb)"
                  />
                  <path
                    fill="#231F20"
                    d="M3.593 39.996l.017 7.459c4.067-.016 8.133-.015 12.2 0l.018-7.46.044-7.678.064-7.679.094-7.586H3.39l.095 7.586.063 7.679.045 7.679z"
                    mask="url(#wa3tkirsxb)"
                  />
                  <path
                    fill="#231F20"
                    d="M17.664 17.052h-1.632l.094 7.586.063 7.68.044 7.678.018 7.68v.22h-.221c-4.214.016-8.427.017-12.641.002l-.222-.001v-.221l.018-7.68.044-7.678.064-7.68.095-7.586H1.756c-.356 0-.643.288-.643.643v31.663c0 .355.287.642.643.642h15.908c.355 0 .643-.287.643-.642V17.695c0-.355-.288-.643-.643-.643M14.922.773c2.103.092 2.74 1.881 2.74 1.881-1.465-.863-4.844-1.974-2.74-1.88zm2.564 14.01h-1.53V9.794l1.53-2.53v7.517zM3.803 9.572L2.095 6.83c4.668-1.972 10.562-1.972 15.23 0l-1.708 2.743c-3.8-.668-8.015-.668-11.814 0zm-.34 5.21h-1.53V7.264l1.53 2.53v4.987zM4.498.772C6.6.68 3.223 1.791 1.758 2.654c0 0 .638-1.789 2.74-1.88zm13.41 5.88V3.088c0-1.123-.808-2.097-1.952-2.364-4.164-.968-8.328-.968-12.492 0C2.32.992 1.512 1.966 1.512 3.09v3.563H0l.242.402h1.27v8.997c0 .375.304.68.679.68H17.23c.375 0 .678-.305.678-.68V7.054h1.27l.242-.402h-1.512z"
                    mask="url(#wa3tkirsxb)"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
})
