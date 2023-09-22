'use client';

import { useRef, useState } from 'react';
import styles from '.././page.module.css';

export default function page() {
  const [file, setFile] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set('file', file);
      const res = await fetch('api/upload', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());

      ref.current && (ref.current.value = '');

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={submit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          ref={ref}
        />
        <input type="submit" value="Upload" />
      </form>
    </main>
  );
}
