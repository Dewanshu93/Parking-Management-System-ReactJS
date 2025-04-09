import React from 'react';
import Navbar from '../Navbar/Navbar';
import "./PlanPage.css"

function PlanPage(props) {
    return (
        <div className='planContainer'>
            <Navbar/>
            <div className='planInternalContainer'>
                <button className='btn7'>Recommended</button>
                <div className='planDetailContainer'>
                    <div className='planCardContainer'>
                        <h1 className='head12'>Regular Class</h1>
                        <h1 className='head13'>
                            <span className='dolloarSign'>$</span>
                            249
                        </h1>
                        <button className='btn13'>Select plan</button>
                        <p className='para14'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, magni!
                        </p>
                        <hr />
                        <ul className='unorderedList'>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                        </ul>
                    </div>
                    <div className='planCardContainer'>
                    <h1 className='head12'>Regular Class</h1>
                        <h1 className='head13'>
                            <span className='dolloarSign'>$</span>
                            249
                        </h1>
                        <button className='btn14'>Select plan</button>
                        <p className='para14'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, magni!
                        </p>
                        <hr />
                        <ul className='unorderedList'>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                        </ul>
                    </div>
                    <div className='planCardContainer'>
                    <h1 className='head12'>Regular Class</h1>
                        <h1 className='head13'>
                            <span className='dolloarSign'>$</span>
                            249
                        </h1>
                        <button className='btn13'>Select plan</button>
                        <p className='para14'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, magni!
                        </p>
                        <hr />
                        <ul className='unorderedList'>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                            <li className='li1'>Lorem, ipsum.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlanPage;