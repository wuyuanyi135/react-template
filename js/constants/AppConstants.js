/*
 * AppConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */

/* Home Constants */
export const UPDATE_RECENT_IMPORT = 'UPDATE_RECENT_IMPORT';
export const UPDATE_RECENT_APPLICANT = 'UPDATE_RECENT_APPLICANT';

export const SET_IMPORT_FORM_STATE = 'SET_IMPORT_FORM_STATE';
export const CHANGE_IMPORT_FORM_PMID = 'CHANGE_IMPORT_FORM_PMID';
export const CHANGE_IMPORT_FORM_LOADING_STATE = 'CHANGE_IMPORT_FORM_LOADING_STATE';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export const CHANGE_IMPORT_FORM_AUTHORS = 'CHANGE_IMPORT_FORM_AUTHORS';
export const CHANGE_IMPORT_FORM_SELECTED_AFFILIATION = 'CHANGE_IMPORT_FORM_SELECTED_AFFILIATION';

/* article info */
export const CHANGE_IMPORT_FORM_SOURCE = 'CHANGE_IMPORT_FORM_SOURCE';

/* Applicant */
export const CHANGE_IMPORT_FORM_APPLICANT_NAME = 'CHANGE_IMPORT_FORM_APPLICANT_NAME';
export const CHANGE_IMPORT_FORM_APPLICANT_DEPARTMENT = 'CHANGE_IMPORT_FORM_APPLICANT_DEPARTMENT';

export const CHANGE_IMPORT_FORM_APPLICANT_NAME_PINYIN = 'CHANGE_IMPORT_FORM_APPLICANT_NAME_PINYIN';
export const CHANGE_IMPORT_FORM_APPLICANT_DEPARTMENT_PINYIN = 'CHANGE_IMPORT_FORM_APPLICANT_DEPARTMENT_PINYIN';

export const CHANGE_IMPORT_FORM_SELECTED_PT = 'CHANGE_IMPORT_FORM_SELECTED_PT';
export const CHANGE_IMPORT_FORM_SELECTED_ISSN = 'CHANGE_IMPORT_FORM_SELECTED_ISSN';

export const CHANGE_IMPORT_FORM_ARTICLE_TITLE = 'CHANGE_IMPORT_FORM_ARTICLE_TITLE';
