import dispatcher from "../appDispatcher";
import * as couseApi from "../api/courseApi";
import actionType from "./actionTypes";

export function saveCourse(course) {
  return couseApi.saveCourse(course).then((savedCourse) => {
    //envia solicitacao ao dispatcher para todos os stores
    dispatcher.dispatch({
      actionType: course.id
        ? actionType.UPDATE_COURSE
        : actionType.CREATE_COURSE,
      course: savedCourse,
    });
  });
}
export function loadCourses() {
  return couseApi.getCourses().then((courses) => {
    dispatcher.dispatch({
      actionType: actionType.LOAD_COURSES,
      courses: courses,
    });
  });
}
export function deleteCourse(id) {
  return couseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionType.DELETE_COURSE,
      id: id,
    });
  });
}
