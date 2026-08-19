package br.edu.hub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "registrations")
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;

    @Column(nullable = false, length = 100)
    private String studentName;

    @Column(nullable = false, length = 160)
    private String studentEmail;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    protected Registration() {
    }

    public Registration(Activity activity, String studentName, String studentEmail) {
        this.activity = activity;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
    }

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public Activity getActivity() { return activity; }
    public String getStudentName() { return studentName; }
    public String getStudentEmail() { return studentEmail; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
