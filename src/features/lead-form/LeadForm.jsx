import styles from "./LeadForm.module.css";

/**
 * TODO: ariza formasi.
 * - useForm({ resolver: zodResolver(leadSchema) }); maydonlar: name, phone (+998 niqob — shared/lib/phone), solutionId
 * - yashirin `website` maydoni (honeypot): className="visually-hidden", tabIndex={-1}, autoComplete="off"
 * - onSubmit: isBot(values) → jim onSuccess(); aks holda useSubmitLead().mutate(values)
 * - xato: t(leadErrorKey(error)) + 502 bo'lsa sozlamalardagi telefon raqami
 * @param {{ solutionId?: string, onSuccess?: () => void }} props
 */
export function LeadForm({ solutionId: _solutionId, onSuccess: _onSuccess }) {
  return <form className={styles.root} noValidate />;
}
