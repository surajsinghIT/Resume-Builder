import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#111',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
    borderBottom: '1 solid #ccc',
    paddingBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 10,
    color: '#555',
    marginTop: 4,
  },
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'uppercase',
    borderBottom: '1 solid #0ea5e9',
    paddingBottom: 2,
  },
  experienceItem: {
    marginBottom: 8,
  },
  jobTitle: {
    fontWeight: 'bold',
  },
  jobDetails: {
    fontSize: 10,
    color: '#555',
  },
  skillItem: {
    marginRight: 6,
    marginBottom: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    border: '1 solid #ccc',
    borderRadius: 4,
    fontSize: 10,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const ResumePdf = ({ personalInfo, experiences, education, skills }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{personalInfo.fullName || 'Your Name'}</Text>
        <Text style={styles.contact}>
          {personalInfo.email || 'email@example.com'} | {personalInfo.phone || '+1234567890'}
        </Text>
        <Text style={styles.contact}>
          {personalInfo.location || 'Your Location'}
        </Text>
      </View>

      {/* Summary */}
      {personalInfo.summary ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text>{personalInfo.summary}</Text>
        </View>
      ) : null}

      {/* Experience */}
      {experiences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experiences.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.title || 'Job Title'}</Text>
              <Text style={styles.jobDetails}>
                {exp.company || 'Company'} | {exp.startDate} - {exp.endDate}
              </Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{edu.degree || 'Degree'}</Text>
              <Text style={styles.jobDetails}>
                {edu.school || 'School'} | {edu.year}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsWrap}>
            {skills.map((skill) => (
              <Text key={skill.id} style={styles.skillItem}>
                {skill.name}
              </Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePdf;
