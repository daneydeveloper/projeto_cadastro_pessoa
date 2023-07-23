package com.cadastro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cadastro.model.Pessoa;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

    @Query("SELECT p FROM Pessoa p WHERE p.nome LIKE %:keyword% OR p.razaoSocial LIKE %:keyword%")
    List<Pessoa> findByNomeOrRazaoSocialContainingIgnoreCase(@Param("keyword") String keyword);

}
