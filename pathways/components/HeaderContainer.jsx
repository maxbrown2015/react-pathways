
import React from 'react';
import '../styles/HeaderContainer.css';
import Flexbox from 'flexbox-react';
import Fade from 'react-reveal/Fade';

const title = 'PATHWAYS ';
const subtitle = 'An Interactive Guide to the Penn History Department\'s Undergraduate Course Offerings'
const pageDescription = 'Below is a tool to help guide you through the many pathways of history at the University of Pennsylvania. Pathways connect courses that share similar historical themes, helping you select classes that suit your interests. Explore Pathways by either clicking on one of the legends to the left or by clicking one of courses in the graph. Alternatively, you can search for a specific course below to learn about its pathways. More information about the currently selected course can be found at the bottom of the page. '

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.store.subscribe(function () {
      this.setState(this.props.store.getState());
    }.bind(this));
  }

  render() {
    return <Flexbox width={'100vw'} height={'140vh'} alignItems={'center'} justifyContent='center' className='HeaderContainer' flexDirection={"column"}>
    <Flexbox flexDirection='column' alignItems={'center'}  height='120vh' width={'100%'}>
      <Flexbox className="PageTitle" marginTop={'15%'} margin={'50px'}>{title} </Flexbox>
      <Flexbox className="PageSubtitle" margin={'50px'} >{subtitle}</Flexbox>
    </Flexbox>
    <div  className='PageIntroContainer' height='20vh' width={'100%'}  >
      <Fade big>
        <div className='PageIntro'>{pageDescription}</div>
      </Fade>
    </div>
    </Flexbox>
  }
} 

export default HeaderContainer;
