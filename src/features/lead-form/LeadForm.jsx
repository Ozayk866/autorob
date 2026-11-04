import styles from "./LeadForm.module.css";

/**
 * TODO: ariza formasi (docs/tz/10-ariza-formasi.md).
 * - useForm({ resolver: zodResolver(leadSchema), mode: "onTouched" })
 * - maydonlar: name, phone (+998 niqob — shared/lib/phone), solutionId (Select — useSolutions), message (variant="contacts")
 * - yashirin `website` (honeypot): className="visually-hidden", tabIndex={-1}, autoComplete="off", aria-hidden
 * - const submit = useSubmitLead(); submit.mutate(values, { onSuccess })  — formStartedAt hook ichida
 * - 400 → setServerErrors(form.setError, error); boshqa xato → t(leadErrorKey(error)) + telefon (useContacts)
 * @param {{ solutionId?: string, variant?: "modal" | "inline" | "contacts", onSuccess?: (values) => void }} props
 */
export function LeadForm({ solutionId: _solutionId, onSuccess: _onSuccess }) {
  return <form className={styles.root} noValidate />;
}
