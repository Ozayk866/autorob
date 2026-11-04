import styles from "./Table.module.css";

/**
 * TODO: ustunlar konfiguratsiyasi bo'yicha jadval; bo'sh holat (EmptyState), yuklanish (Skeleton)
 * @param {{ columns: { key: string, title: string, render?: (row: any) => import("react").ReactNode }[], rows: any[] }} props
 */
export function DataTable({ columns, rows }) {
  return (
    <table className={styles.root}>
      <thead>
        <tr>
          {columns.map((c) => (
            <th key={c.key}>{c.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {columns.map((c) => (
              <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
