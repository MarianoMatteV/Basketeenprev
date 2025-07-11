create database basketeenprev;
use basketeenprev;

create table usuario(
	id int primary key not null auto_increment,
    nome varchar(255),
    idade int,
    email varchar(255),
    senha varchar(100),
    status enum("usuario", "fisioterapeuta") default("usuario")
);

create table postar(
    id int primary key not null auto_increment,
    titulo varchar(255),
    texto text,
    video text,
    comentar varchar(255)
);

create table comentarios(
    id_comentario int primary key not null auto_increment,
    id_usuario int,
    id_post int,
    comentar varchar(255),
    foreign key (id_usuario) references usuario(id),
    foreign key (id_post) references postar(id)
)