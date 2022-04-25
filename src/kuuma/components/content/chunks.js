export default function chunks(props) {
    const { body = null, type = 'primary' } = props || {}

    if (!body) return '';

    return `
<div class="box" style="padding: 1rem; color: var(--color-bg); background-color: var(--color-${type}});">
${chunks(body)}
</div>
    `
}
