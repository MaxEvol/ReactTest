import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onChange);

    const slug = props.match.params.slug; //parametro recebido pela url :slug defenido na rota

    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      //recupera o curso e coloca muda o stado do objeto curso para o valor recebido
      setCourse(courseStore.getCourseBySlug(slug));
    }

    return () => courseStore.removeChangeListener(onChange);
    //useeffect depende de um valor para mudar, no caso props.match.params.slug caso o parametro mude ele refaz a chamada
    //caso não seja definido nada ele fica rodando sem parar
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  //necessario para inputs se não tiver um handler os inputs não funcina
  function handleChange({ target }) {
    setCourse({
      //recria o objeto course com valores digitados
      ...course,
      //valida os dados digitados
      [target.name]: target.value,
    });
  }

  function handleSubmit(event) {
    //verifica o post
    event.preventDefault();
    //valida o form
    if (!formIsValid()) return;
    //faz o post e redireciona
    courseActions.saveCourse(course).then(() => {
      //caso tenha sucesso redireciona
      props.history.push("/courses");
      //efeito do toastify para avisar que esta salvo
      toast.success("Curso Salvo");
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Titulo Obrigatorio";
    if (!course.authorId) _errors.authorId = "Autor Obrigatorio";
    if (!course.category) _errors.category = "Categoria Obrigatorio";

    //atualiza o status da variavel de erros
    setErrors(_errors);
    //javascript verifica se tem algum chave dentro de _errors
    return Object.keys(_errors).length === 0;
  }

  return (
    <div>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        //comportamento que os inputs tem que ter para receber dados
        onChange={handleChange}
        //comportamento de envio do formulario
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ManageCoursePage;
