-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19-Jun-2024 às 21:25
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `vagas_database`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `competencias`
--

CREATE TABLE `competencias` (
  `id` int(10) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `competencias`
--

INSERT INTO `competencias` (`id`, `nome`) VALUES
(1, 'PHP'),
(2, 'JavaScript'),
(3, 'Python'),
(4, 'Java'),
(5, 'HTML'),
(6, 'CSS'),
(7, 'React'),
(8, 'Node.js'),
(9, 'SQL'),
(10, 'Git');

-- --------------------------------------------------------

--
-- Estrutura da tabela `lista_token`
--

CREATE TABLE `lista_token` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `lista_token`
--

INSERT INTO `lista_token` (`id`, `token`, `email`) VALUES
(39, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcmxpbkBjYXJsaW4uY29tIiwidmVyc2FvIjoiYTA4MDM4NDgxMTU5MjNkYjljODE5MTBmNzcyZTI2ZDgiLCJ0aXBvIjoxLCJpZCI6OSwiaWF0IjoxNzE4ODIxODM2fQ.q4Gc53cvwyphB_2al5T5JvWkAQtqUvy5KnKQh5zhTrw', 'carlin@carlin.com');

-- --------------------------------------------------------

--
-- Estrutura da tabela `ramos`
--

CREATE TABLE `ramos` (
  `id` int(10) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `ramos`
--

INSERT INTO `ramos` (`id`, `nome`, `descricao`) VALUES
(1, 'Desenvolvimento de Software', 'Responsável por projetar, desenvolver e manter aplicativos de software.'),
(2, 'Administração de Redes', 'Responsável por gerenciar e manter redes de computadores dentro de uma organização.'),
(3, 'Segurança Cibernética', 'Responsável por proteger sistemas de computadores, redes e dados contra ameaças cibernéticas.'),
(4, 'Administração de Banco de Dados', 'Responsável por gerenciar e manter bancos de dados dentro de uma organização.');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `competencias` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `experiencia` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `ramo` varchar(10) DEFAULT NULL,
  `vagas` varchar(100) DEFAULT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `tipo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `competencias`, `experiencia`, `ramo`, `vagas`, `descricao`, `tipo`) VALUES
(1, 'teste12', 'teste@teste.com', '123123123', '[{\"id\":2,\"nome\":\"JavaScript\"},{\"id\":5,\"nome\":\"HTML\"}]', '[{\"id\":0,\"nome_empresa\":\"testes\",\"inicio\":\"2022-10-12\",\"fim\":\"2023-10-12\",\"cargo\":\"tester\"}]', '', NULL, '', 0),
(4, 'carlin', 'carlin2@carlin2.com', '123123123', '[{\"id\":2,\"nome\":\"JavaScript\"},{\"id\":3,\"nome\":\"Python\"},{\"id\":7,\"nome\":\"React\"}]', '[{\"id\":0,\"nome_empresa\":\"testes\",\"inicio\":\"10/10/24\",\"fim\":\"10/10/24\",\"cargo\":\"tester\"}]', NULL, NULL, NULL, 0),
(5, 'teste1', 'h@h.com', '123123123', '[{\"id\":2,\"nome\":\"JavaScript\"},{\"id\":3,\"nome\":\"Python\"},{\"id\":7,\"nome\":\"React\"}]', '[{\"id\":0,\"nome_empresa\":\"2\",\"inicio\":\"2010-10-12\",\"fim\":\"2010-04-30\",\"cargo\":\"tester\"}]', '', NULL, '', 0),
(7, 'testeOI', 'admin@admin.com', '123456789', '[{\"id\":2,\"nome\":\"JavaScript\"},{\"id\":3,\"nome\":\"Python\"},{\"id\":7,\"nome\":\"React\"}]', '[{\"id\":0,\"nome_empresa\":\"2\",\"inicio\":\"2010-10-12\",\"fim\":\"2010-04-30\",\"cargo\":\"tester\"}]', '', NULL, '', 0),
(8, 'teste12', 'empresa@email.com', '12345678', '[]', '[{\"id\":0,\"nome_empresa\":\"\",\"inicio\":\"\",\"fim\":\"\",\"cargo\":\"\"}]', '0', NULL, 'dasda', 1),
(9, 'teste222', 'carlin@carlin.com', '123123123', NULL, NULL, '1', NULL, '0dsa', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `vagas`
--

CREATE TABLE `vagas` (
  `id` int(10) NOT NULL,
  `ramo_id` int(10) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descricao` varchar(100) NOT NULL,
  `experiencia` int(10) NOT NULL,
  `competencias` varchar(100) NOT NULL,
  `salario_min` int(100) NOT NULL,
  `salario_max` int(100) NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `empresa` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `vagas`
--

INSERT INTO `vagas` (`id`, `ramo_id`, `titulo`, `descricao`, `experiencia`, `competencias`, `salario_min`, `salario_max`, `ativo`, `empresa`) VALUES
(0, 1, 'tester2456565', 'teste', 2, '[{\"id\":3,\"nome\":\"Python\"}]', 3000, 10000, 1, 'carlin@carlin.com');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `competencias`
--
ALTER TABLE `competencias`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `lista_token`
--
ALTER TABLE `lista_token`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `ramos`
--
ALTER TABLE `ramos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `competencias`
--
ALTER TABLE `competencias`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de tabela `lista_token`
--
ALTER TABLE `lista_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de tabela `ramos`
--
ALTER TABLE `ramos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
