package br.edu.hub.config;

import br.edu.hub.entity.Activity;
import br.edu.hub.entity.ActivityCategory;
import br.edu.hub.entity.ActivityStatus;
import br.edu.hub.entity.Registration;
import br.edu.hub.repository.ActivityRepository;
import br.edu.hub.repository.RegistrationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@ConditionalOnProperty(name = "hub.seed.enabled", havingValue = "true", matchIfMissing = true)
public class DataInitializer implements CommandLineRunner {
    private final ActivityRepository activityRepository;
    private final RegistrationRepository registrationRepository;

    public DataInitializer(ActivityRepository activityRepository, RegistrationRepository registrationRepository) {
        this.activityRepository = activityRepository;
        this.registrationRepository = registrationRepository;
    }

    @Override
    public void run(String... args) {
        if (activityRepository.count() > 0) return;

        LocalDateTime now = LocalDateTime.now();
        List<Activity> activities = List.of(
                activity("Workshop de Spring Boot", "Construa uma API REST com Spring Boot, validação e persistência.", ActivityCategory.WORKSHOP, ActivityStatus.OPEN, 30, 25, "Prof. João Ribeiro", "Laboratório 04", now.plusDays(3).withHour(14).withMinute(0)),
                activity("Introdução à Inteligência Artificial", "Palestra sobre fundamentos, aplicações e impactos sociais da inteligência artificial.", ActivityCategory.LECTURE, ActivityStatus.FULL, 80, 80, "Profa. Camila Nunes", "Auditório Central", now.plusDays(5).withHour(19).withMinute(0)),
                activity("React na Prática", "Minicurso de componentes, hooks, roteamento e consumo de APIs com React.", ActivityCategory.COURSE, ActivityStatus.OPEN, 24, 18, "Lucas Martins", "Sala Maker", now.plusDays(8).withHour(9).withMinute(0)),
                activity("Horta Comunitária do Campus", "Projeto de extensão para implantação e cuidado coletivo de uma horta sustentável.", ActivityCategory.EXTENSION_PROJECT, ActivityStatus.OPEN, 40, 12, "Profa. Ana Clara", "Centro de Vivência", now.plusDays(12).withHour(8).withMinute(30)),
                activity("Semana de Tecnologia 2026", "Encontro com oficinas, mostra de projetos e conversas com profissionais da indústria.", ActivityCategory.EVENT, ActivityStatus.OPEN, 200, 143, "Diretório Acadêmico", "Bloco de Engenharia", now.plusDays(18).withHour(8).withMinute(0)),
                activity("Comunicação e Oratória", "Workshop com exercícios de apresentação, escuta e construção de narrativas.", ActivityCategory.WORKSHOP, ActivityStatus.FULL, 20, 20, "Marina Lopes", "Sala 12", now.plusDays(20).withHour(16).withMinute(0)),
                activity("Direitos Humanos e Universidade", "Debate aberto sobre inclusão, cidadania e o papel social da universidade.", ActivityCategory.LECTURE, ActivityStatus.OPEN, 100, 61, "Prof. Bruno Sá", "Teatro Universitário", now.plusDays(25).withHour(18).withMinute(30)),
                activity("Python para Análise de Dados", "Curso introdutório de Python, pandas e visualização para projetos acadêmicos.", ActivityCategory.COURSE, ActivityStatus.OPEN, 35, 34, "Profa. Elisa Campos", "Laboratório 02", now.plusDays(28).withHour(13).withMinute(30)),
                activity("Clínica de Orientação Profissional", "Atendimento e oficinas de preparação de currículo para jovens da comunidade.", ActivityCategory.EXTENSION_PROJECT, ActivityStatus.OPEN, 50, 22, "Núcleo de Carreiras", "Clínica Escola", now.plusDays(35).withHour(10).withMinute(0)),
                activity("Mostra de Cinema Brasileiro", "Sessões comentadas de produções brasileiras contemporâneas.", ActivityCategory.EVENT, ActivityStatus.OPEN, 120, 77, "Coletivo de Cinema", "Cine Campus", now.plusDays(42).withHour(17).withMinute(0)),
                activity("Feira de Estágios", "Conexão entre estudantes, organizações e oportunidades de estágio.", ActivityCategory.EVENT, ActivityStatus.CLOSED, 300, 286, "Central de Estágios", "Ginásio", now.minusDays(15).withHour(9).withMinute(0)),
                activity("Escrita Acadêmica", "Minicurso sobre estrutura, argumentação, referências e revisão de textos científicos.", ActivityCategory.COURSE, ActivityStatus.CLOSED, 32, 29, "Profa. Helena Luz", "Biblioteca - Sala 3", now.minusDays(8).withHour(14).withMinute(0))
        );

        activityRepository.saveAll(activities);
        List<Registration> registrations = new ArrayList<>();
        for (Activity activity : activities) {
            for (int index = 1; index <= activity.getRegisteredCount(); index++) {
                registrations.add(new Registration(activity,
                        "Estudante " + index,
                        "estudante" + index + ".atividade" + activity.getId() + "@universidade.edu.br"));
            }
        }
        registrationRepository.saveAll(registrations);
    }

    private Activity activity(String title, String description, ActivityCategory category, ActivityStatus status,
                              int capacity, int registeredCount, String organizer, String location,
                              LocalDateTime date) {
        return new Activity(title, description, category, status, capacity, registeredCount, organizer, location, date);
    }
}
