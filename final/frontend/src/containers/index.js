import React from 'react';
import Headers from '../components/ui/Header';
import ScoreTable from '../components/ui/ScoreTable';
import '../App.css';

// 基本底層畫面、route by user role
// replace ScoreTable with student page or TA page
export default function index() {
  return (
    <div className="wrapper">
      <Headers title="Hackthon Online Judge System" />
      <div className="content-layout">
        <ScoreTable />
      </div>
    </div>
  );
}
