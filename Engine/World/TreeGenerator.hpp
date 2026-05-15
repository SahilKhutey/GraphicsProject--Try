#pragma once

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <vector>
#include <stack>
#include <World/LSystem.hpp>

namespace Aether {

struct TreeSegment {
    glm::vec3 start;
    glm::vec3 end;
    float thickness;
};

class TreeGenerator {
public:
    struct TurtleState {
        glm::vec3 position;
        glm::vec3 direction;
        float thickness;
    };

    static std::vector<TreeSegment> Interpret(const std::string& grammar, float angle, float length) {
        std::vector<TreeSegment> segments;
        std::stack<TurtleState> stateStack;
        
        TurtleState current = { glm::vec3(0,0,0), glm::vec3(0,1,0), 1.0f };
        
        for (char c : grammar) {
            if (c == 'F') { // Draw Forward
                glm::vec3 nextPos = current.position + current.direction * length;
                segments.push_back({ current.position, nextPos, current.thickness });
                current.position = nextPos;
                current.thickness *= 0.95f; // Tapering
            } else if (c == '+') { // Rotate Right
                current.direction = glm::rotate(glm::mat4(1.0f), glm::radians(angle), glm::vec3(1,0,0)) * glm::vec4(current.direction, 0.0f);
            } else if (c == '-') { // Rotate Left
                current.direction = glm::rotate(glm::mat4(1.0f), glm::radians(-angle), glm::vec3(1,0,0)) * glm::vec4(current.direction, 0.0f);
            } else if (c == '[') { // Push State
                stateStack.push(current);
            } else if (c == ']') { // Pop State
                current = stateStack.top();
                stateStack.pop();
            }
        }
        return segments;
    }
};

} // namespace Aether
