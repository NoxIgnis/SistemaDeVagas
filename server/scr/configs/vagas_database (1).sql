-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19-Jun-2024 às 04:36
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
  `experiencias` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `ramos` varchar(10) DEFAULT NULL,
  `vagas` varchar(100) DEFAULT NULL,
  `ramo` varchar(100) DEFAULT NULL,
  `tipo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `competencias`, `experiencias`, `ramos`, `vagas`, `ramo`, `tipo`) VALUES
(1, 'teste1', 'teste@teste.com', '25d55ad283aa400af464c76d713c07ad', '[{\"id\":2,\"nome\":\"JavaScript\"},{\"id\":3,\"nome\":\"Python\"}]', '[{\"id\":0,\"nome_empresa\":\"testes\",\"inicio\":\"10/10/24\",\"fim\":\"10/10/24\",\"cargo\":\"tester\"}]', NULL, NULL, NULL, 0),
(4, 'carlin', 'carlin@carlin.com', '25d55ad283aa400af464c76d713c07ad', '[{\"id\":1,\"nome\":\"PHP\"},{\"id\":6,\"nome\":\"CSS\"}]', '[{\"id\":0,\"nome_empresa\":\"testes\",\"inicio\":\"10/10/24\",\"fim\":\"10/10/24\",\"cargo\":\"tester\"}]', NULL, NULL, NULL, 0),
(5, 'teste1', 'h@h.com', '25d55ad283aa400af464c76d713c07ad', NULL, NULL, NULL, NULL, NULL, 0);

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
  `ativo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `ramos`
--
ALTER TABLE `ramos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
