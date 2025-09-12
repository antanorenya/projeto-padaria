document.addEventListener('DOMContentLoaded', () => {
    console.log("Script carregado e DOM pronto.");

    const totalInput = document.querySelector('input[name="total-pedido"]');

    // Seleciona todos os inputs de quantidade
    const inputs = document.querySelectorAll('.quantidade-input, .sabor-opcoes input, .bolo-personalizado textarea');

    function atualizarTotal() {
        let total = 0;

        // Itera sobre todos os produtos
        document.querySelectorAll('.produto-item').forEach(produto => {
            const p = produto.querySelector('p');
            if (!p) return; // Se não tiver preço, pula

            // Preço em número
            let precoStr = p.textContent.replace('R$', '').replace(',', '.').trim();
            let preco = parseFloat(precoStr);
            if (isNaN(preco)) preco = 0;

            // Soma quantidade multiplicando pelo preço
            const quantidadeInputs = produto.querySelectorAll('input[type="number"]');
            quantidadeInputs.forEach(input => {
                const qtd = parseFloat(input.value) || 0;
                total += qtd * preco;
            });
        });

        totalInput.value = total.toFixed(2).replace('.', ',');
        console.log('Total atualizado: R$', total.toFixed(2));
    }

    // Adiciona evento de input em todos os campos de quantidade
    inputs.forEach(input => {
        input.addEventListener('input', atualizarTotal);
    });

    // Atualiza total ao carregar a página
    atualizarTotal();

    console.log("Eventos de input adicionados a todos os produtos.");
});
