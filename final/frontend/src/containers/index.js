import React from 'react';
import Headers from '../components/ui/Header';
import ScoreTable from '../components/ui/ScoreTable';
import '../App.css';
import Student from './page/Student';

// 基本底層畫面、route by user role
// replace ScoreTable with student page or TA page
export default function index() {
  return (
    <div className="wrapper">
      <Headers title="Hackthon Online Judge System" />
      <div className="content-layout">
        <Student />
      </div>
    </div>
  );
}
