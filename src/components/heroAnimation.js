import React, { useEffect, useState,useRef } from "react";
import styled, { keyframes } from "styled-components";
import {CircularProgress} from '@material-ui/core'

let logoRotation = -40
let s1 = 120
let ratio = 6


export default ({ size,speed ,plainCircles}) => {
  const [functions,setFunctions] = useState()//pointless
  useEffect(()=>{
    const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
const rotate2 = keyframes`
from {
  transform: rotate(360deg);
}

to {
  transform: rotate(0deg);
}
`;
  const StyledReact = styled.img`

-webkit-animation: ${rotate2} 75s linear infinite;
  -moz-animation: ${rotate2} 75s linear infinite;
  -ms-animation: ${rotate2} 75s linear infinite;
  -o-animation: ${rotate2} 75s linear infinite;
  animation: ${rotate2} 75s linear infinite;  z-index:10;
  width:60px;
  height:60px;
  margin:auto;
  width:${size / 5.5}px;
  height:${size / 5.5}px;
  transform:rotate(3000deg);
  transition-duration:15000ms
`
  const StyledRing = styled.div`

z-index:10;
  
/*   box-shadow:inset 3px 3px 1px 3px white;  */
  opacity:.6;
  box-sizing:border-box;
  width:${size}px;
  height:${size}px;
  border-radius:50%;
  position:absolute;
  transition-timing-function:linear;
  transition-duration:${s1 * ratio}ms;
  filter:blur(0px);
  border-style: double;
  border-left-width:0px;
  border-bottom-width:${size / 25}px;
   border-top-width:${size / 22}px;
   border-right-width:${plainCircles?0:(size / 18)}px;
   ${({ color }) => {
       return `
    border-color:${'#888'};
    box-shadow:inset 4px 2px 1px 2px ${'#888'}; 
    border-color:${color};
    box-shadow:inset 4px 2px 1px 2px ${color}; 
    border-bottom-color:#0000;
    &:hover{
      cursor:pointer;
      
    }
    `
    }}
`
  const StyledBall = styled.div`
z-index:10;
  opacity:.9;
font-family:sans-serif;
text-align:center;
position:absolute;
border-radius:50%; 
display:flex;
font-size:3em;
margin:auto;
transition-timing-function:linear;
transition-duration:${s1 * ratio}ms;
${({ ss, c, i }) => {
      let si = Math.sin(c / 1000 * (1 + 10) + ((ss * Math.PI) / 6)) * 2
      return `
     
`}}
&:hover{
  cursor:pointer;
  filter:invert(1);
}
`
  const Container = styled.div`
  // animation: ${rotate} 75s linear infinite;
// position:absolute;
// right:100px;
// top:0;
display: flex;
    align-items: center;
    justify-content: center;
    width: ${size}px;
    height: ${size}px;
    // margin:auto;
    // margin-top:40px;
    flex-shrink:0;

`
  function AnimatedRing({ c, i, ss, color }) {
    let si = Math.sin(c / 400 * 10 + ((ss * Math.PI) / 6)) * 5+5
    const transform = `
 rotateY(${(90)}deg) 
 rotateX(${(120 * i + 90)}deg) 
 rotateY(${(si + 20)}deg)
 rotateZ(${(c / 2 + ss * 0) * ratio}deg)`
    return <StyledRing {...{ color }} style={{
      transform
    }} />
    //+ 100-(c-10000)
  }
  function AnimatedBall({plainCircles, image, w, c, i, ss, color }) {
    let si = Math.sin(c / 400 * 10 + ((ss * Math.PI) / 6)) * 5.5+5
    let transform = ` 
  rotateY(${90}deg) 
  rotateX(${(120 * i + 90)}deg) 
  rotateY(${(si + 20)}deg)
  rotateZ(${(c / 2 + ss * 0) * ratio}deg)

  rotateZ(${logoRotation}deg)
  translateY(${(size / 2-7)}px)
  rotateZ(${-logoRotation}deg)

  rotateZ(-${(c / 2 + ss * 0) * ratio}deg)
  rotateY(-${(si + 20)}deg)
  rotateX(-${(120 * i + 90)}deg) 
  rotateY(-${(90)}deg) 
  
  `
  let nn=.5+(Math.sin((c/20)+1.9*i)+1)*.4
  let filter=`
  brightness(${nn})  contrast(${nn})  blur(${1-nn}px)
  `
  //s:size Should grow and shrink based on its location in the sine wave
  let s=(nn*50)-25
    return <StyledBall {...{ color }} style={
      plainCircles?{}:{transform}
    } >
      {plainCircles?<div key={i} 
      style={{
        transition:'all 1000ms',
        opacity:s/50,
        width:s + "px",
        height:s + "px",
        borderRadius:'50%',
         backgroundColor:color,
        // filter:'blur(1px)',
        border:'2px solid '+color,
        // filter,
      }}/>
      :<img src={image} width={w} />
    }
    </StyledBall>
  }
  function Main({speed}) {

let [c, sc] = useState(10000)
    let [started,setStarted] = useState(false)
    let ti = (s1 / 1.25) * ratio //timeInterval var :1000
    const generalReference = useRef({started})
    generalReference.current.started = started
    generalReference.current.speed = speed
    useEffect(() => {
      let t = Date.now()
      let h={}
      re()
      function re() {
        h.i=requestAnimationFrame((e) => {
          let ut = Date.now() - t    //actual time since client refresh :3200
          if (ut >= ti || !generalReference.current.started) {
            
            if (!generalReference.current.started)setStarted(true)
            sc((cc) => cc + 6*generalReference.current.speed)
            t = Date.now()
          }
          re()
        })
      }
      return ()=>cancelAnimationFrame(h.i)
    }, [])
    let ff=1
    let colors = ['#c86c36', '#56a3da', '#c9b652']
    let reactImg = 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'
    return <Container className='animatedReact'>
      <AnimatedRing {...{ color: "#c86c36", c:c+ff, i: 1, ss: 3 }} />
      <AnimatedRing {...{ color: "#56a3da", c, i: 2, ss: 3 }} />
      <AnimatedRing {...{ color: "#c9b652", c:c+ff/2, i: 3, ss: 3 }} />
      {/* html  */} <AnimatedBall {...{plainCircles,color:colors[0], w: size / 7, image: './HTML.png', c:c+ff, i: 1, ss: 3 }} />
      {/* css  */} <AnimatedBall {...{plainCircles,color:colors[1], w: size / 6, image: 'https://storage.needpix.com/rsynced_images/logo-2582747_1280.png', c, i: 2, ss: 3 }} />
      {/* js  */}<AnimatedBall {...{plainCircles,color:colors[2], w: size / 7, image: './JavaScript.png', c:c+ff/2, i: 3, ss: 3 }} />
      {/* </>} */}
      {plainCircles?
      <div style = {{
        transform: 'scaleX(-1)',

      }}>

        {/* < CircularProgress  size={size/10} thickness={2} color="secondary"style = {{
            color: '#ddd',
            filter: 'drop-shadow(0px 0px 4px white)',
        }} /> */}
      </div>
      :
      <StyledReact src={reactImg} {...{ w: size / 9,}} />
  }
    </Container>
  }
  setFunctions({rotate,rotate2,StyledReact,StyledRing,StyledBall,Container,AnimatedRing,AnimatedBall,Main,})
  },[])
  const {Main,} = functions || {}//?
  //artificialy intelligent development assistant:  (Aida)
  return functions?<Main speed = {speed} size = {size}/>:<div>"loading"</div>
}

