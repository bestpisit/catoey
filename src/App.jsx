import React, { useEffect, useState } from 'react';
import CatoeyImage from './images/catoey.png';
import materialImage from './images/material.png';
import thiefImage from './images/thief.png';
import buildingImage from './images/building.png';

const App = () => {
  const [teams, setTeam] = useState([{ name: "Team1", record: {} }, { name: "Team2", record: {} }]);
  const [step, setStep] = useState(1);
  const [sNum, setSnum] = useState(0);
  const [newTeam,setNewTeam] = useState("");
  const stage = [
    {
      name: "Choose"
    },
    {
      name: "Move Thief"
    }
  ];
  function nextStep() {
    setStep(step + 1);
    setSnum((sNum + 1) % stage.length);
  }
  function revertStep() {
    if (step > 1) {
      setStep(step - 1);
      setSnum((sNum + 1) % stage.length);
    }
  }
  return (
    <div className='w-screen h-screen bg-slate-900'>
      <img src={CatoeyImage} className='absolute w-full h-full object-cover non-select z-0' />
      <div className="absolute min-h-screen flex items-center justify-center w-full z-10">
        <div className="bg-white shadow-md rounded-lg max-w-5xl flex w-full h-[500px] overflow-auto">
          <div className='p-5 flex flex-col'>
            <div className='text-2xl font-bold text-center mb-4'>
              Step
            </div>
            <div className="text-3xl font-bold text-center mb-4 p-5 bg-green-500 rounded-lg">{numberToRoman(step)}</div>
            <div className='flex flex-col'>
              <button className='text-lg rounded-t-xl text-center bg-lime-400 hover:bg-lime-500 p-2' onClick={() => { nextStep() }}>Next Step</button>
              <button className='text-lg rounded-b-xl text-center bg-red-400 hover:bg-red-500 p-2' onClick={() => { revertStep() }}>Revert</button>
            </div>
            <div className='flex flex-grow'>
            </div>
            <div className='flex flex-col'>
              <input type='text' placeholder='team name' className='border-4' onChange={(e)=>{setNewTeam(e.target.value)}}/>
              <button className='text-lg rounded-xl text-center bg-yellow-400 hover:bg-yellow-500 p-2' onClick={() => {
                setTeam(team=>[...team,{ name: newTeam, record: {} }])
              }}>Add Team</button>
            </div>
          </div>
          <div className='flex flex-col flex-grow bg-slate-500'>
            {
              stage[sNum]?.name == "Choose" && (
                <div className='w-full bg-lime-400 text-xl font-bold text-center p-1'>
                  {
                    stage[sNum]?.name
                  }
                </div>
              )
            }
            {
              stage[sNum]?.name == "Move Thief" && (
                <div className='w-full bg-red-400 text-xl font-bold text-center p-1'>
                  {
                    stage[sNum]?.name
                  }
                </div>
              )
            }
            <div className='flex flex-grow gap-2 m-2'>
              {
                teams.map((team,index) =>
                  <TeamDialogue key={index} stage={stage[sNum].name} team={team} step={step} setTeam={setTeam}/>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TeamDialogue = ({stage, team, step, setTeam}) => {
  const setRecord = (teamName, key, value) => {
    setTeam(prevTeams =>
      prevTeams.map(teamm =>
        teamm.name === teamName ? { ...teamm, record: { ...teamm.record, [key]: value } } : teamm
      )
    );
  };
  return (
    <div className='flex flex-grow flex-col justify-center bg-slate-200 rounded-lg' key={team}>
      {
        stage == "Choose" && (
          <div>
            <div className='text-center'>
              {
                team?.name
              }
            </div>
            <div className='flex flex-row'>
              <div className='flex flex-grow'>
                <img src={materialImage} className={`w-full h-full hover:p-4 ${team?.record?.[step] == 1 ? ' p-2 border-4 border-green-500' : ''}`} onClick={() => {
                  setRecord(team?.name, step, 1)
                }} />
              </div>
              <div className='flex flex-grow'>
                <img src={buildingImage} className={`w-full h-full hover:p-4 ${team?.record?.[step] == 2 ? ' p-2 border-4 border-red-500' : ''}`} onClick={() => {
                  setRecord(team?.name, step, 2)
                }} />
              </div>
            </div>
          </div>
        )
      }
      {
        stage == "Move Thief" && (
          <div>
            {
              team?.name
            }
            <div className='flex flex-row'>
              <div className='flex flex-grow'>
                <img src={thiefImage} className={`w-full h-full`} />
              </div>
            </div>
          </div>
        )
      }
      <div className='flex flex-grow'></div>
      <div>
        <button className='text-lg rounded-xl text-center bg-red-400 hover:bg-red-500 p-2' onClick={() => { setTeam(prevTeams => prevTeams.filter(teamm => teamm.name !== team.name)); }}>Delete Team</button>
      </div>
    </div>
  );
}

function numberToRoman(num) {
  if (num < 1 || num > 3999) {
    return "0";
  }
  const numeralCodes = [["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];
  let result = "";
  for (const [numeral, value] of numeralCodes) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

export default App
