# Database Design

## Collections

### Admin

| Field     | Type   |
| --------- | ------ |
| username  | String |
| password  | String |
| createdAt | Date   |
| updatedAt | Date   |

---

### Students

| Field    | Type   |
| -------- | ------ |
| name     | String |
| email    | String |
| mobile   | String |
| school   | String |
| standard | Number |
| board    | String |
| password | String |

---

### Question Papers

| Field      | Type     |
| ---------- | -------- |
| title      | String   |
| board      | String   |
| standard   | Number   |
| subject    | String   |
| chapter    | String   |
| uploadedBy | ObjectId |
| pdfPath    | String   |

---

### Questions

| Field    | Type    |
| -------- | ------- |
| question | String  |
| optionA  | String  |
| optionB  | String  |
| optionC  | String  |
| optionD  | String  |
| answer   | String  |
| approved | Boolean |

---

### Exams

| Field          | Type   |
| -------------- | ------ |
| title          | String |
| duration       | Number |
| totalQuestions | Number |
| publishDate    | Date   |

---

### Results

| Field      | Type     |
| ---------- | -------- |
| studentId  | ObjectId |
| examId     | ObjectId |
| marks      | Number   |
| percentage | Number   |
| rank       | Number   |
