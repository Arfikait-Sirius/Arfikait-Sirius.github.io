import {
    Jessica,
} from "./heroines.js" ;


// Decralations =================================================================================
const DEFAULT_GOAL_SCORE = 10000 ;
const DEFAULT_BASE_SCORE = 1 ;

const DEFAULT_MULTIPLIER = 1 ;
const DEFAULT_BOMB_SCORE = 1 ;

let goalScore = DEFAULT_GOAL_SCORE ;
let baseScore = DEFAULT_BASE_SCORE ;

let multiplier = DEFAULT_MULTIPLIER ;
let bombScore = DEFAULT_BOMB_SCORE ;

let bombStack = 1 ;

const SKILLS = {
    MULTIPLIER: "multiplier",
    BOMB: "bomb",
} ;

const STATUS = {
    MULTIPLIER: "multiplier",
    BOMB: "bomb",
} ;
const statusMap = new Map() ;
statusMap.set( STATUS.MULTIPLIER, Jessica.fnGetElementFromId( "label_status_multiplier" ) ) ;
statusMap.set( STATUS.BOMB, Jessica.fnGetElementFromId( "label_status_bomb" ) ) ;


// Parts ==========================================================================================
const goalScoreText = Jessica.fnGetElementFromId( "label_goal_score" ) ;
const updateGoalScore = ( score ) => {
    goalScore = score ;
    Jessica.fnSetText( goalScoreText, goalScore ) ;
} ;

const scoreText = Jessica.fnGetElementFromId( "label_score" ) ;
const updateScore = ( score ) => {
    Jessica.fnSetText( scoreText, score ) ;
} ;

const reset = () => {
    score = 0 ;
    updateScore( score ) ;
    resetClear() ;
    
    baseScore = DEFAULT_BASE_SCORE ;
    multiplier = DEFAULT_MULTIPLIER ;
    bombScore = DEFAULT_BOMB_SCORE ;
    resetStatus() ;
} ;
const resetClear = () => {
    Jessica.fnSetText( clearMessageText, "" ) ;
} ;
const resetStatus = () => {
    statusMap.forEach( ( v, _ ) => {
        Jessica.fnSetText( v, 1 ) ;
    } ) ;
} ;

const clearMessageText = Jessica.fnGetElementFromId( "label_clear_message" ) ;
const isClear = ( score ) => {
    if( score >= goalScore ){
        Jessica.fnSetText( clearMessageText, "Congraturations!" ) ;
    }
} ;

const updateStatus = ( key, value ) => {
    Jessica.fnSetText( statusMap.get( key ), value ) ;
} ;


// Main ===========================================================================================
Jessica.fnSetText( goalScoreText, goalScore ) ;

const newGoalScoreTextbox = Jessica.fnGetElementFromId( "textbox_new_goal_score" ) ;
const changeGoalButton = Jessica.fnGetElementFromId( "button_change_goal_score" ) ;
Jessica.fnAddClickEvent( changeGoalButton, () => {
    reset() ;
    newGoalScoreTextbox.style.display = "inline" ;
    changeGoalButton.innerHTML = "APPLY" ;
    Jessica.fnAddClickEvent( changeGoalButton, () => {
        if( newGoalScoreTextbox.value >= 10000 ){
            updateGoalScore( newGoalScoreTextbox.value ) ;
        }
        newGoalScoreTextbox.style.display = "none" ;
        changeGoalButton.innerHTML = "CHANGE" ;
        Jessica.fnAddClickEvent( changeGoalButton, functionChangeGoalButton ) ;
    } ) ;
} ) ;
const functionChangeGoalButton = changeGoalButton.onclick ;

const restartButton = Jessica.fnGetElementFromId( "button_restart" ) ;
Jessica.fnAddClickEvent( restartButton, () => {
    reset() ;
} ) ;

const skillX2 = Jessica.fnGetElementFromId( "button_skill_x2" ) ;
Jessica.fnAddClickEvent( skillX2, () => {
    multiplier *= 2 ;
    updateStatus( STATUS.MULTIPLIER, multiplier ) ;
} ) ;

const skillBomb = Jessica.fnGetElementFromId( "button_skill_bomb" ) ;
Jessica.fnAddClickEvent( skillBomb, () => {
    bombScore++ ;
    updateStatus( STATUS.BOMB, bombScore ) ;
} ) ;

const getScore = ( currScore, base ) => {
    let newScore = base ;

    newScore *= multiplier ;
    if( bombStack == 10 ){
        newScore += currScore * bombScore ;
        bombStack = 1 ;
    } else {
        bombStack++ ;
    }

    return newScore ;
} ;


// Play ===========================================================================================
let score = 0 ;
const clickArea = Jessica.fnGetElementFromId( "canvas_click" ) ;

Jessica.fnAddClickUpEvent( clickArea, () => {
    score += getScore( score, baseScore ) ;
    updateScore( score ) ;
    isClear( score ) ;
} ) ;
